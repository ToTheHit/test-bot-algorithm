import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import TextNodeModel from './TextNodeModel';
import TextNodeWidget from './TextNodeWidget';

export default class TextNodeFactory extends AbstractReactFactory {
  constructor() {
    super('incomingText');
  }

  generateReactWidget(event) {
    return <TextNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event) {
    return new TextNodeModel();
  }
}
