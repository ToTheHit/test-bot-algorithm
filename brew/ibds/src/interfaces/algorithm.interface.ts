import { Schema } from 'mongoose';

export default interface Algorithm {
  parsedEngine: Schema.Types.Mixed;
  readonly _id: Schema.Types.ObjectId;
  title: String;
  description: String;
  engine: Schema.Types.Mixed;
}
