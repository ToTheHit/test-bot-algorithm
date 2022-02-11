import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import CustomNodeModel from './NodeModel';
import CustomNodeWidget from './Widget';

export class CustomNodeFactory extends AbstractReactFactory {
  constructor() {
    super('diamond');
  }

  generateReactWidget(event) {
    return <CustomNodeWidget engine={this.engine} size={50} node={event.model} />;
  }

  generateModel(event) {
    return new CustomNodeModel();
  }
}
