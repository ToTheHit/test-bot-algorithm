import React, { useEffect, useRef, useState } from 'react';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel
} from '@projectstorm/react-diagrams';

import {
  CanvasWidget
} from '@projectstorm/react-canvas-core';

import { CustomNode } from './CustomNodes/CustomNode';
import { CustomNodeFactory } from './Custom/NodeFactory';
import CustomNodeModel from './Custom/NodeModel';

import classNames from '../../lib/classNames';
import './editor.less';

import { TextNodeFactory } from './Custom/Incoming/Factories';
import { TextNodeModel } from './Custom/Incoming/Models';

import store from '../../mobx/Store';
import EditorStore from '../../mobx/EditorStore';
import Output from './Output';

/*
  const { count, change } = store;
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('useEffect');
    const temp = count.map(obj => <Output key={obj.id} obj={obj} />);

    setData(temp);
  }, [count]);
*/


const Editor = () => {
  const { updateNode, updateLink } = EditorStore;
  const [engine, setEngine] = useState(null);

  const [model, setModel] = useState(new DiagramModel());

  useEffect(() => {
    const subEngine = createEngine();

    // subEngine
    //   .getNodeFactories()
    //   .registerFactory(new CustomNodeFactory());

    subEngine
      .getNodeFactories()
      .registerFactory(new TextNodeFactory());

    model.registerListener({
      linksUpdated(event) {
        updateLink(event.link, event.isCreated);
      },
      nodesUpdated(event) {
        updateNode(event.node);
      }
    });

    subEngine.setModel(model);
    setEngine(subEngine);
  }, []);

  useEffect(() => {
    const TextNode = new TextNodeModel({
      name: 'TextNode',
      color: 'rgb(47,255,0)'
    });

    TextNode.setPosition(50, 200);

    const TextNode2 = new TextNodeModel({
      name: 'TextNode #2',
      color: 'rgb(255,224,0)'
    });

    TextNode2.setPosition(450, 400);

    // node3.addOutPort('Out3');

    // link them and add a label to the link
    // const link = port1.link(port2);

    // link.addLabel('123');

    model.addAll(TextNode, TextNode2);
  }, []);

  useEffect(() => {
    // engine.setModel(model);
  }, [model]);

  const removeNode = () => {
    const nodes = model.getNodes();
    // console.log(test);

    nodes[0].remove();
    engine.repaintCanvas();
  };

  const renameLink = () => {
    const serialized = model.serialize();

    console.log('serialized model', serialized);

    const linkId = Object.keys(serialized.layers[0].models)[0];
    const link = model.getLink(linkId);

    console.log('link', link);

    link.labels[0].options.label = '1';
    engine.repaintCanvas();
  };
  const test = () => {
    const serialized = model.serialize();

    console.log('serialized model', serialized);
  };

  const { count, change } = store;
  const [data, setData] = useState([]);

  useEffect(() => {
    const temp = count.map(obj => <Output key={obj.id} obj={obj} />);

    setData(temp);
  }, [count]);

  return (
    <div
      className={classNames('test-wrapper')}
      onContextMenu={e => {
        // e.preventDefault();
      }}
    >
      {/*<button onClick={() => change(0)}>test1</button>*/}
      {/*{data}*/}
       <button onClick={() => test()}>test</button>
      {engine && <CanvasWidget engine={engine} className="canvas-widget" />}
    </div>
  );
};

Editor.propTypes = {};

export default Editor;
