import * as React from 'react';

import {
  DefaultNodeWidget, DefaultNodeFactory
} from '@projectstorm/react-diagrams';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import CustomNodeModel from './CustomNodeModel';

export default class CustomNodeFactory extends DefaultNodeFactory {
  constructor() {
    super();
    this.type = 'customNode';
  }
  //
  // generateReactWidget(event) {
  //   return super.generateReactWidget(event);
  //   //   // return super.generateReactWidget(event);
  // //
  // //   return <div>123213</div>;
  // }
  //
  // //
  // generateModel(event) {
  //   return new CustomNodeModel(event);
  // }
}
