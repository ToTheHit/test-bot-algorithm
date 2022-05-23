import { Schema } from 'mongoose';

export interface FlowContext {
  currentId: string;
  _currentBLockId: string;
}

export default interface TelegramUser {
  readonly _id: Schema.Types.ObjectId;
  readonly messenger: string;
  _flowId: Schema.Types.ObjectId;
  flowContext: FlowContext;
  mtprotoStorage: Schema.Types.Map;
  title: String;
  phone: String;
  isActive: Boolean;
}
