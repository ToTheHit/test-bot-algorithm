import {
  PortModel, DefaultLinkModel
} from '@projectstorm/react-diagrams';

export class DiamondPortModel extends PortModel {
  constructor(alignment) {
    super({
      type: 'diamond',
      name: alignment,
      alignment
    });
  }

  createLinkModel() {
    return new DefaultLinkModel();
  }
}
