import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { FlowPortModel } from '../../Models';

export default class FlowPortFactory extends AbstractModelFactory {
  constructor(type, cb) {
    super(type);
    this.cb = data => new FlowPortModel(data);
  }

  generateModel(event) {
    return this.cb(event.initialConfig);
  }
}
