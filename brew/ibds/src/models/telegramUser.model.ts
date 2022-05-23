import { model, Schema, Document } from 'mongoose';
import TelegramUser from '@interfaces/telegramUsers.interface';

const telegramUserSchema: Schema = new Schema({
  messenger: {
    type: String,
    enum: ['telegram', 'vk'],
    required: true,
    protected: true
  },
  _flowId: {
    type: Schema.Types.ObjectId,
    default: null
  },
  flowContext: {
    type: Schema.Types.Mixed,
    default: null
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: null
  },
  mtprotoStorage: {
    type: Map,
    of: { type: String },
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const telegramUserModel = model<TelegramUser & Document>('TelegramUser', telegramUserSchema);

export default telegramUserModel;
