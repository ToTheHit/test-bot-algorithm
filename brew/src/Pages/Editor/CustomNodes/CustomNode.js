import { DefaultPortModel, NodeModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import { PortModelAlignment } from '@projectstorm/react-diagrams-core';

import CustomPort from '../CustomPorts/CustomPort'

// eslint-disable-next-line import/prefer-default-export
export class CustomNode extends DefaultNodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: 'default'
    });
  }
}
