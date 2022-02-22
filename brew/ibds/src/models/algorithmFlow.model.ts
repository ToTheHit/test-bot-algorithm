import { Document, model, Schema } from 'mongoose';
import Algorithm from '@interfaces/algorithm.interface';

const AlgorithmSchema: Schema = new Schema({
  title: {
    type: String,
    default: 'Алгоритм',
  },
  engine: {
    type: Schema.Types.Mixed,
    // required: true,
    default: null,
  },
  parsedEngine: {
    type: Schema.Types.Mixed,
    default: null,
    private: true,
  },
  description: {
    type: String,
    default: null,
  },
});

const algorithmModel = model<Algorithm & Document>('Algorithm', AlgorithmSchema);

export default algorithmModel;
