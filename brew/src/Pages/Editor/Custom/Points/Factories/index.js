import { SimplePointModel } from '../Models';

export default class SimplePointFactory {
  constructor(type) {
    // super(type);

    this.cb = data => new SimplePointModel(data);
  }

  generateModel(event) {
    return this.cb(event.initialConfig);
  }
}
