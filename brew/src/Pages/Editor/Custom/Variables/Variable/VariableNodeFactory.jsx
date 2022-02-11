import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import VariableNodeModel from './VariableNodeModel';
import VariableNodeWidget from './VariableNodeWidget';

export default class VariableNodeFactory extends AbstractReactFactory {
  constructor() {
    super('variableNode');
  }

  generateReactWidget(event) {
    return <VariableNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event) {
    return new VariableNodeModel();
  }
}
