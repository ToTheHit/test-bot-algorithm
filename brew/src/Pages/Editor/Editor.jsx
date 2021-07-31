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

import { VariableNodeFactory } from './Custom/Variables/Factories';
import { VariableNodeModel } from './Custom/Variables/Models';

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

const testModel = {
  id: 'a1ad350f-5bae-4bda-83ad-f08769a55476',
  offsetX: 0,
  offsetY: 0,
  zoom: 100,
  gridSize: 0,
  layers: [
    {
      id: '49d4f5d0-8353-41dd-8c20-d31874264bdb',
      type: 'diagram-links',
      isSvg: true,
      transformed: true,
      models: {
        'a7b5f4d7-71a5-476c-9f79-55387959a855': {
          id: 'a7b5f4d7-71a5-476c-9f79-55387959a855',
          type: 'default',
          source: 'e6d320ad-2859-447f-a3f2-c69e60ed7987',
          sourcePort: '37eaf9b7-dde2-4eb7-a529-c8e4130d84c4',
          target: 'f5e3b97b-34cd-48b8-807e-ea662f09f4bf',
          targetPort: '6a9d8745-4610-40ed-b7ec-4ccf3cca017e',
          points: [
            {
              id: '18a2257c-92ea-412e-b072-500aa713979f',
              type: 'point',
              x: 164.625,
              y: 411
            },
            {
              id: 'f8f76e2d-c783-4c83-8ea1-ba6f41a3d161',
              type: 'point',
              x: 310,
              y: 396
            }
          ],
          labels: [
            {
              id: 'aad9eed8-63ca-4bb9-97ac-f2ee6d5b0c20',
              type: 'default',
              offsetX: 0,
              offsetY: -23,
              label: 'Авто-линк'
            }
          ],
          width: 3,
          color: 'gray',
          curvyness: 50,
          selectedColor: 'rgb(0,192,255)'
        }
      }
    },
    {
      id: 'fc0b5643-082f-48a7-a0c1-78fd2cd8ebe9',
      type: 'diagram-nodes',
      isSvg: false,
      transformed: true,
      models: {
        'f5e3b97b-34cd-48b8-807e-ea662f09f4bf': {
          id: 'f5e3b97b-34cd-48b8-807e-ea662f09f4bf',
          type: 'incomingText',
          selected: true,
          x: 294,
          y: 210,
          ports: [
            {
              id: '42beb50e-7d4f-4219-80aa-a71013acad74',
              type: 'flow',
              x: 295,
              y: 261,
              name: 'flowIn',
              alignment: 'left',
              parentNode: 'f5e3b97b-34cd-48b8-807e-ea662f09f4bf',
              links: []
            },
            {
              id: 'bff872de-4a62-43a7-9fd9-6e23b1ab4945',
              type: 'flow',
              x: 599.75,
              y: 261,
              name: 'flowOut',
              alignment: 'right',
              parentNode: 'f5e3b97b-34cd-48b8-807e-ea662f09f4bf',
              links: []
            },
            {
              id: 'c3904ec2-9308-49c3-9405-6c4436d5a5da',
              type: 'text',
              x: 295,
              y: 336,
              name: 'incomingText',
              alignment: 'left',
              parentNode: 'f5e3b97b-34cd-48b8-807e-ea662f09f4bf',
              links: []
            },
            {
              id: '6a9d8745-4610-40ed-b7ec-4ccf3cca017e',
              type: 'text',
              x: 295,
              y: 381,
              name: 'comparisonText',
              alignment: 'left',
              parentNode: 'f5e3b97b-34cd-48b8-807e-ea662f09f4bf',
              links: [
                'a7b5f4d7-71a5-476c-9f79-55387959a855'
              ]
            },
            {
              id: '86167a54-798a-4fc1-9f07-a6e41ddcd549',
              type: 'message',
              x: 629.75,
              y: 336,
              name: 'outgoingMsg',
              alignment: 'right',
              parentNode: 'f5e3b97b-34cd-48b8-807e-ea662f09f4bf',
              links: []
            }
          ]
        },
        'e6d320ad-2859-447f-a3f2-c69e60ed7987': {
          id: 'e6d320ad-2859-447f-a3f2-c69e60ed7987',
          type: 'variableNode',
          x: 50,
          y: 400,
          ports: [
            {
              id: '37eaf9b7-dde2-4eb7-a529-c8e4130d84c4',
              type: 'variable',
              x: 153.625,
              y: 401,
              name: 'out',
              alignment: 'right',
              parentNode: 'e6d320ad-2859-447f-a3f2-c69e60ed7987',
              links: [
                'a7b5f4d7-71a5-476c-9f79-55387959a855'
              ]
            }
          ]
        }
      }
    }
  ]
};

const fn = model => {
  const nodes = model.layers.find(layer => layer.type === 'diagram-nodes').models;
  const links = model.layers.find(layer => layer.type === 'diagram-links').models;

  console.log('>> nodes', nodes);
  console.log('>> links', links);

  return model;
};

const Editor = () => {
  const { updateNode, updateLink } = EditorStore;
  const [engine, setEngine] = useState(null);

  const [model, setModel] = useState(new DiagramModel());

  useEffect(() => {
    const subEngine = createEngine();

    subEngine
      .getNodeFactories()
      .registerFactory(new CustomNodeFactory());

    subEngine
      .getNodeFactories()
      .registerFactory(new TextNodeFactory());

    subEngine
      .getNodeFactories()
      .registerFactory(new VariableNodeFactory());

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

    TextNode.setPosition(250, 200);
    const comparisonPortTextNode = TextNode.getPort('comparisonText');

    model.addAll(TextNode);

    /*    const TextNode2 = new TextNodeModel({
      name: 'TextNode #2',
      color: 'rgb(255,224,0)'
    });

    TextNode2.setPosition(450, 400);
    model.addAll(TextNode2); */

    /*
    const CustomNode = new CustomNodeModel({
      name: 'TextNode #2',
      color: 'rgb(255,224,0)'
    });

    model.addAll(CustomNode);
    */

    const VariableNode = new VariableNodeModel({
      name: 'TextNode #2',
      color: 'rgb(255,224,0)'
    });

    VariableNode.setPosition(50, 400);

    const variableNodeOutPort = VariableNode.getPort('out');

    const link1 = variableNodeOutPort.link(comparisonPortTextNode);
    link1.addLabel('Авто-линк');

    model.addAll(VariableNode, link1);

    // variableNodeOutPort.link(comparisonPortTextNode);
    // node3.addOutPort('Out3');
    // let link1 = variableNodeOutPort.link(comparisonPortTextNode);

    // link them and add a label to the link
    // const link = port1.link(port2);

    // link.addLabel('123');

    // model.addAll(TextNode, TextNode2);
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

  /*  useEffect(() => {
    const temp = count.map(obj => <Output key={obj.id} obj={obj} />);

    setData(temp);
  }, [count]); */

  useEffect(() => {
    console.log(fn(testModel))
  }, []);

  return (
    <div
      className={classNames('test-wrapper')}
      onContextMenu={e => {
        // e.preventDefault();
      }}
    >
      {/* <button onClick={() => change(0)}>test1</button> */}
      {/* {data} */}
      <button onClick={() => test()}>test</button>
       {engine && <CanvasWidget engine={engine} className="canvas-widget" />}
    </div>
  );
};

Editor.propTypes = {};

export default Editor;
