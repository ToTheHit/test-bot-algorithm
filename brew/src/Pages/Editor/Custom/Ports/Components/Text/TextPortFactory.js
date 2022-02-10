import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { TextPortModel } from '../../Models';

export default class TextPortFactory extends AbstractModelFactory {
  constructor(type, cb) {
    super(type);

    this.cb = (data) => new TextPortModel();
  }

  generateModel(event) {
    return this.cb(event.initialConfig);
  }
}
