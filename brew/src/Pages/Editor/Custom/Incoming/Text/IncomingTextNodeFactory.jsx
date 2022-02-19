import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import IncomingTextNodeModel from './IncomingTextNodeModel';
import TextNodeWidget from './TextNodeWidget';

export default class IncomingTextNodeFactory extends AbstractReactFactory {
  constructor() {
    super('incomingText');
  }

  generateReactWidget(event) {
    return <TextNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event) {
    return new IncomingTextNodeModel(event.initialConfig);
  }
}
