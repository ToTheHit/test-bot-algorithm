import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import MediaNodeWidget from './MediaNodeWidget';

export default class IncomingMediaNodeFactory extends AbstractReactFactory {
  constructor() {
    super('incomingMedia');
  }

  generateReactWidget(event) {
    return <MediaNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event) {
    return new MediaNodeWidget(event.initialConfig);
  }
}
