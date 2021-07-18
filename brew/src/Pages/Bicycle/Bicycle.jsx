import React, { useEffect, useRef, useState } from 'react';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel
} from '@projectstorm/react-diagrams';

import {
  CanvasWidget
} from '@projectstorm/react-canvas-core';

import classNames from '../../lib/classNames';

import './bicycle.less';

const Bicycle = () => {
  const [engine, setEngine] = useState(null);

  const [model, setModel] = useState(new DiagramModel());

  useEffect(() => {
    const subEngine = createEngine();

    subEngine.setModel(model);
    setEngine(subEngine);
  }, []);

  useEffect(() => {
    // node 1
    const node1 = new DefaultNodeModel({
      name: 'Node 1',
      color: 'rgb(0,192,255)'
    });

    node1.setPosition(100, 100);
    const port1 = node1.addOutPort('Out');

    // node 2
    const node2 = new DefaultNodeModel({
      name: 'Node 2',
      color: 'rgb(47,255,0)'
    });

    node2.setPosition(300, 200);
    const port2 = node2.addOutPort('Out');

    // link them and add a label to the link
    const link = port1.link(port2);

    link.addLabel('Hello World!');

    model.addAll(node1, node2, link);
    console.log(model.serialize().layers[1]);
  }, []);

  useEffect(() => {
    // engine.setModel(model);
  }, [model]);

  return (
    <div className={classNames('test-wrapper')}>
      {engine && <CanvasWidget engine={engine} className="canvas-widget" />}
    </div>
  );
};

Bicycle.propTypes = {};

export default Bicycle;
