import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import OutgoingTextNodeModel from './OutgoingTextNodeModel';
import TextNodeWidget from './TextNodeWidget';

export default class OutgoingTextNodeFactory extends AbstractReactFactory {
  constructor() {
    super('outgoingText');
  }

  generateReactWidget(event) {
    return <TextNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event) {

    return new OutgoingTextNodeModel(event.initialConfig);
  }
}
