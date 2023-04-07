const path = require('path');
const MTProto = require('@mtproto/core');
const { sleep } = require('@mtproto/core/src/utils/common');

const api_id = 7281870;
const api_hash = 'f601f39cd0d629b5b95c14db53d6133a';

class API {
  constructor({ test } = { test: false }) {
    this.mtproto = new MTProto({
      api_id,
      api_hash,
      test,
      storageOptions: {
        path: path.resolve(__dirname, './telegramData.json')
      }
    });
  }

  async call(method, params, options = {}) {
    try {
      const result = await this.mtproto.call(method, params, options);

      return result;
    } catch (error) {
      console.error('>>> call-error: ', error);
      const { error_code, error_message } = error;

      if (error_code === 420) {
        // tmp msg
        const seconds = Number(error_message.split('FLOOD_WAIT_')[1]);
        const ms = seconds * 1000;

        await sleep(ms);

        return this.call(method, params, options);
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split('_MIGRATE_');

        const dcId = Number(dcIdAsString);

        // If auth.sendCode call on incorrect DC need change default DC, because
        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === 'PHONE') {
          await this.mtproto.setDefaultDc(dcId);
        } else {
          Object.assign(options, { dcId });
        }

        return this.call(method, params, options);
      }

      throw error;
    }
  }

  async getUser() {
    try {
      const user = await this.call('users.getFullUser', {
        id: {
          _: 'inputUserSelf'
        }
      });

      return user;
    } catch (error) {
      console.error('>>> getUser-error #1', error);

      return null;
    }
  }

  sendCode(phone) {
    // eslint-disable-next-line no-useless-catch
    try {
      return this.call('auth.sendCode', {
        phone_number: phone,
        settings: {
          _: 'codeSettings'
        }
      });
    } catch (error) {
      throw error;
    }
  }

  signIn(code, phone, phone_code_hash) {
    return this.call('auth.signIn', {
      phone_code: code,
      phone_number: phone,
      phone_code_hash
    });
  }

  signUp({ phone, phone_code_hash }) {
    return this.call('auth.signUp', {
      phone_number: phone,
      phone_code_hash,
      first_name: 'MTProto',
      last_name: 'Core'
    });
  }

  getPassword() {
    return this.call('account.getPassword');
  }

  checkPassword({ srp_id, A, M1 }) {
    return this.call('auth.checkPassword', {
      password: {
        _: 'inputCheckPasswordSRP',
        srp_id,
        A,
        M1
      }
    });
  }
}

module.exports = API;
