import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { VariablePortModel } from '../../Models';

export default class VariablePortFactory extends AbstractModelFactory {
  constructor(type, cb) {
    super(type);
    this.cb = (data) => new VariablePortModel();
  }

  generateModel(event) {
    return this.cb(event.initialConfig);
  }
}
