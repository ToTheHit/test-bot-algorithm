import { PointModel } from '@projectstorm/react-diagrams';

export default class SimplePointModel extends PointModel {
  constructor(options) {
    super({
      ...options,
      type: 'simplePoint'
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getAllLinks() {
    // return [];

    return [this.getLink()];
  }
}
