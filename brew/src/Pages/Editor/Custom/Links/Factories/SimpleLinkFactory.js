import {
  DefaultLinkFactory
} from '@projectstorm/react-diagrams';
import { SimpleLinkModel } from '../Models';

export default class SimpleLinkFactory extends DefaultLinkFactory {
  constructor(type) {
    super(type);

    this.cb = data => new SimpleLinkModel(data);
  }

  generateModel(event) {
    return this.cb(event.initialConfig);
  }
}
