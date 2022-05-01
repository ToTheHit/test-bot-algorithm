import {
  DefaultLinkModel
} from '@projectstorm/react-diagrams';

export default class CustomLinkModel extends DefaultLinkModel {
  constructor() {
    super({
      type: 'simpleLink'
    });
  }
}
