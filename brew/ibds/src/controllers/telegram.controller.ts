import { logger } from '@utils/logger';
import { HttpException } from '@exceptions/HttpException';
import TelegramUserService from '@services/telegramUsers.service';

class TelegramController {
  private telegramServiceInstances = new Map();

  private telegramService;

  constructor() {
    const handler = {
      get: function (obj, prop) {
        if (typeof obj[prop] !== 'function') {
          return obj[prop];
        }

        return function (...args) {
          obj.getTelegramInstanceMiddleware(...args);
          obj[prop](...args);
        };
      },
    };
    return new Proxy(this, handler);
  }

  getTelegramInstanceMiddleware(req, res) {
    logger.debug(`request phone: ${req.body.phone}`);
    const expression = `^\\(?([0-9]{1})\\)?[-. ]?([0-9]{3})?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$`;
    if (!req.body.phone || !`${req.body.phone}`.match(expression)) {
      throw new HttpException(400, "field 'phone' is invalid");
    }
    let telegramServiceInstance = this.telegramServiceInstances.get(req.body.phone);

    if (!telegramServiceInstance) {
      telegramServiceInstance = new TelegramUserService(req.body.phone);
      this.telegramServiceInstances.set(`${req.body.phone}`, telegramServiceInstance);
    }
    this.telegramService = telegramServiceInstance;
  }

  private getPassword() {
    return this.telegramService.call('account.getPassword', undefined, {});
  }

  private checkPassword({ srp_id, A, M1 }) {
    return this.telegramService.call('auth.checkPassword', {
      password: {
        _: 'inputCheckPasswordSRP',
        srp_id,
        A,
        M1,
      },
    });
  }

  public test = async (req, res) => {
    logger.debug(`>>> Telegram.controller -> fn 'Test'`);

    res.send(200);
  };

  public getUser = async (req, res) => {
    try {
      const user = await this.telegramService.call('users.getFullUser', {
        id: {
          _: 'inputUser',
          user_id: req.body.userId,
          access_hash: req.body.accessHash,
        },
      });
      await this.telegramService.init();

      return res.send({ user });
    } catch (error) {
      console.error('>>> getUser-error #2', error);
      return res.send(error);
    }
  };

  public autoAuth = async ({body}) => {
    try {
      await this.telegramService.call('users.getFullUser', {
        id: {
          _: 'inputUser',
          user_id: body.userId,
          access_hash: body.accessHash,
        },
      });
      await this.telegramService.init();
      logger.info(`TG: init user ${body.userId} completed`)
    } catch (error) {
      console.error('>>> getUser-error #3', error);
    }
  };

  public sendCode = async (req, res) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await this.telegramService.call('auth.sendCode', {
        phone_number: req.body.phone,
        settings: {
          _: 'codeSettings',
        },
      });
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  };

  public signIn = async (req, res) => {
    const { code, phone, phone_code_hash } = req.body;
    try {
      const result = await this.telegramService.call('auth.signIn', {
        phone_code: code,
        phone_number: phone,
        phone_code_hash,
      });
      return res.send(result);
    } catch (error) {
      if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
        return res.send(error);
      }
      console.log(error);
      return res.send({ message: 'Need password' });
    }
  };

  public signInPassword = async (req, res) => {
    const password = req.body.password;
    const { srp_id, current_algo, srp_B } = await this.getPassword();
    const { g, p, salt1, salt2 } = current_algo;
    const { A, M1 } = await this.telegramService.getSRPParams({
      g,
      p,
      salt1,
      salt2,
      gB: srp_B,
      password,
    });
    let signInResult;
    try {
      signInResult = await this.checkPassword({ srp_id, A, M1 });
    } catch (error) {
      signInResult = error;
    }

    res.send(signInResult);
  };

  public start = async (req, res) => {
    this.telegramService.activateDeactivate(req.body.phone, true);

    res.send({});
  }
  public stop = async (req, res) => {
    await this.telegramService.activateDeactivate(req.body.phone, false);

    res.send({});
  }
}

export default TelegramController;
