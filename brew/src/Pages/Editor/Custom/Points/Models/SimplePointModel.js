import { PointModel } from '@projectstorm/react-diagrams';

export default class SimplePointModel extends PointModel {
  constructor(options) {
    super({
      isAllowedRemove: true,
      ...options,
      type: 'simplePoint'
    });
  }

  get allowedRemove() {
    return this.options.isAllowedRemove;
  }

  // eslint-disable-next-line class-methods-use-this
  getAllLinks() {
    // return [];

    return [this.getLink()];
  }
}
