import TelegramUser from '@interfaces/telegramUsers.interface';
import telegramUserModel from '@models/telegramUser.model';
import { Schema, UpdateWriteOpResult } from 'mongoose';
import path from 'path';
import { logger } from '@utils/logger';
import TempLocalStorage from '@engine/telegram/CustomStorage.mtproto';
import algorithmModel from '@models/algorithmFlow.model';
import { HttpException } from '@exceptions/HttpException';
const MTProto = require('@mtproto/core');
const api_id = process.env.TG_API_ID || '7281870';
const api_hash = process.env.TG_API_HASH || 'f601f39cd0d629b5b95c14db53d6133a';
const { sleep } = require('@mtproto/core/src/utils/common');
import Algorithm from '@interfaces/algorithm.interface';

const allowedIds = new Map([
  [`${process.env.TG_HOTEL_ID}`, 'bot_hotel']
]);

class TelegramUserService {
  public telegramUser = telegramUserModel;
  public mtproto;
  private userPhone;
  private lastMessageDate = null;

  constructor(phone) {
    logger.debug(`TelegramUserService -> phone -> ${phone}`);
    this.userPhone = phone;
    this.mtproto = new MTProto({
      api_id,
      api_hash,
      initConnectionParams: {
        device_model: 'by D. Ushakov',
        system_version: '6.0.1',
        app_version: process.env.npm_package_version,
      },
      storageOptions: {
        // path: path.resolve(__dirname, './telegramData.json'),
        instance: new TempLocalStorage(phone),
      },
    });

    this.mtproto.updateInitConnectionParams = this.mtproto.updates.on('updates', async updateInfo => {
      const messages = [];

      // console.log(updateInfo);
      for (const { message } of updateInfo.updates) {
        if (!message) {
          continue;
        }
        const { message: text, media, reply_markup } = message;
        // console.log(message);

        if (allowedIds.get(`${message.peer_id.user_id}`)) {
          // console.log('!!!', message);
          logger.info(`updates: ${text.out ? 'outgoing' : 'incoming'} > ${message.message || message.media._}`);
          const buttons = [];
          if (reply_markup && reply_markup._ === 'replyKeyboardMarkup') {
            reply_markup.rows.forEach((row, index) => {
              buttons[index] = [];
              row.buttons.forEach(button => {
                buttons[index].push(button.text);
              });
            });
          }

          messages.push({
            text,
            media,
            buttons,
          });
        }
      }

      if (messages.length) {
        // logger.info(`updates: ${messages.length}`);
        for (const message of messages) {
          await this.executeIncomeMessage(message);
        }
      }
    });

    this.mtproto.updates.on('updateShortMessage', async updateInfo => {
      // console.log(updateInfo);
      logger.info(`updateShortMessage: ${updateInfo.out ? 'outgoing' : 'incoming'} > ${updateInfo.message}`);

      await this.executeIncomeMessage({ text: updateInfo.message });
    });

    this.mtproto.updates.on('updateShortChatMessage', updateInfo => {
      logger.info('updateShortChatMessage:', updateInfo);
    });
  }

  public async create(data): Promise<TelegramUser> {
    return this.telegramUser.create(data);
  }

  public async update(userId: string, data): Promise<UpdateWriteOpResult> {
    return this.telegramUser.updateOne({ _id: userId }, data);
  }

  public async activateDeactivate(phone: string, activate: boolean): Promise<UpdateWriteOpResult> {
    const $set = {
      isActive: activate
    }
    if (activate) {
      $set.flowContext = {}
    }
    await this.telegramUser.updateOne({ phone: phone }, {$set})
    if (activate) {
      await this.init(true);

    }
  }

  public async init(force = false) {
    const { _flowId, flowContext } = await this.telegramUser.findOne({ phone: this.userPhone }).select('_flowId flowContext').lean();
    if (!flowContext.currentId || force) {
      const {parsedEngine}: Algorithm = await algorithmModel.findOne({ _id: _flowId }).select('parsedEngine.start').lean();

      await this.telegramUser.updateOne({ phone: this.userPhone }, { $set: { 'flowContext.currentId': parsedEngine['start'].nextId } });
      await this.sendMessage(parsedEngine['start'].content);
    }
  }

  public async call(method: string, params, options = {}) {
    try {
      return this.mtproto.call(method, params, options);
    } catch (error) {
      logger.error(`>>> call-error:, ${JSON.stringify(error)}`);
      const { error_code, error_message } = error;

      if (error_code === 420) {
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

  public async getSRPParams(data) {
    return this.mtproto.crypto.getSRPParams(data);
  }

  // 04cba40d-f05b-4929-b750-becf61e33161
  private async executeIncomeMessage({ text = '', media = '', buttons = [] }) {
    // console.log({ text, media, buttons });
    const currentDate = Date.now();
    const lastMessageDate = this.lastMessageDate;

    const { _flowId, flowContext, isActive } = await this.telegramUser.findOne({ phone: this.userPhone })
      .select('_flowId flowContext isActive').lean();
    if (!isActive) {
      return;
    }
    const algorithm: Algorithm = await algorithmModel.findOne({ _id: _flowId }).select('parsedEngine').lean();
    let currentBlock = algorithm.parsedEngine[flowContext.currentId || 'start'];
    let nextBlock = algorithm.parsedEngine[(currentBlock && currentBlock.nextId) || 'start'];

    if (currentBlock) {
      if (currentBlock.content && currentBlock.content !== text) {
        // throw new HttpException(400, `Unexpected message. Wait message: ${currentBlock.content}`);
        logger.error(`Unexpected message. Wait message: ${currentBlock.content}`);
        return;
      }
      if (currentBlock.buttons) {
        // TODO: Добавить проверку на порядок кнопок после обновления редактора
        const allButtons = [];
        buttons.forEach(row => {
          row.forEach(button => {
            allButtons.push(button);
          });
        });
        // console.log(allButtons);
        if (currentBlock.buttons.length !== allButtons.length) {
          logger.error(`Unexpected buttons count. Actual: ${allButtons.length}. Expected: ${currentBlock.buttons.length}`);
          return;
        }
        currentBlock.buttons.forEach(button => {
          if (allButtons.indexOf(button) === -1) {
            logger.error(`Could not find button "${button}"`);
            return;
          }
        });
      }
      if (currentBlock.media && !media) {
        logger.error(`Unexpected message. Wait media message`);
        return;
      }
    }
    if (lastMessageDate && currentDate - lastMessageDate > currentBlock.maxWaitingTime) {
      logger.error(`Long time: ${((currentDate - lastMessageDate) / 1000).toFixed(3)}. Expected: ${(currentBlock.maxWaitingTime / 1000).toFixed(3)}`);
    }

    while (nextBlock.direction !== 'incoming') {
      currentBlock = algorithm.parsedEngine[(currentBlock && currentBlock.nextId) || 'start'];

      if (nextBlock.direction === 'outgoing') {
        await this.sendMessage(nextBlock.content);
      }
      nextBlock = algorithm.parsedEngine[currentBlock.nextId || 'start'];
    }
    this.lastMessageDate = Date.now();
    await this.telegramUser.updateOne({ phone: this.userPhone }, { $set: { 'flowContext.currentId': currentBlock.nextId } });
  }

  // TODO: разделить методы на текстовые сообщения и медиа
  public async sendMessage(content) {
    try {
      await new Promise(resolve => setTimeout(() => resolve(true), 5000));
      // console.log('>>> sendMessage #2', {
      //   peer: {
      //     _: 'inputPeerUser',
      //     user_id: process.env.TG_API_ID,
      //     access_hash: `${process.env.TG_API_HASH}`,
      // user_id: 494424456,
      //   access_hash: 123,
      //   },
      //   message: content,
      //   random_id: `${new Date().valueOf()}`,
      // });

      await this.call('messages.sendMessage', {
        peer: {
          _: 'inputPeerUser',
          user_id: process.env.TG_HOTEL_ID,
          access_hash: `${process.env.TG_HOTEL_HASH}`,
        },
        message: content,
        random_id: `${new Date().valueOf()}`,
      });
    } catch (e) {
      console.error(e);
    }

    this.lastMessageDate = Date.now();
  }
}

export default TelegramUserService;
