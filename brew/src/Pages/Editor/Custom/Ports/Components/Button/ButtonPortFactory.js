import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { ButtonPortModel } from '../../Models';

export default class ButtonPortFactory extends AbstractModelFactory {
  constructor(type, cb) {
    super(type);

    this.cb = (data) => new ButtonPortModel();
  }

  generateModel(event) {
    return this.cb(event.initialConfig);
  }
}
