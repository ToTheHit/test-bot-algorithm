import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import StartNodeWidget from './StartNodeWidget';
import StartNodeModel from './startNodeModel';
// import TextNodeModel from './TextNodeModel';
// import TextNodeWidget from './TextNodeWidget';

export default class StartNodeFactory extends AbstractReactFactory {
  constructor() {
    super('startNode');
  }

  generateReactWidget(event) {
    return <StartNodeWidget engine={this.engine} node={event.model} />;
    // return <TextNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event) {
    // return new TextNodeModel();
    return new StartNodeModel();
  }
}
