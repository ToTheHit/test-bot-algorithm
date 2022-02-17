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
import './editor.less';

import { IncomingTextNodeFactory } from './Custom/Incoming/Factories';
import { IncomingTextNodeModel } from './Custom/Incoming/Models';

import { OutgoingTextNodeFactory } from './Custom/Outgoing/Factories';
import { OutgoingTextNodeModel } from './Custom/Outgoing/Models';

import { VariableNodeFactory } from './Custom/Variables/Factories';
import { VariableNodeModel } from './Custom/Variables/Models';

import StartNodeModel from './Custom/Start/startNodeModel';
import StartNodeFactory from './Custom/Start/StartNodeFactory';

import TextPortFactory from './Custom/Ports/Components/Text/TextPortFactory';
import FlowPortFactory from './Custom/Ports/Components/Flow/FlowPortFactory';
import VariablePortFactory from './Custom/Ports/Components/Variable/VariablePortFactory';
import ButtonPortFactory from './Custom/Ports/Components/Button/ButtonPortFactory'

import store from '../../mobx/Store';
import EditorStore from '../../mobx/EditorStore';

import axios from 'axios';

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
          type: 'incomingMsg',
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
              name: 'incomingMsg',
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

const nodeFactories = {
  textNode: new IncomingTextNodeFactory(),
  variableNode: new VariableNodeFactory(),
  startNode: new StartNodeFactory(),
  outgoingText: new OutgoingTextNodeFactory()
};

const portFactories = {
  textPort: new TextPortFactory('text'),
  flowPort: new FlowPortFactory('flow'),
  variablePort: new VariablePortFactory('variable'),
  buttonPort: new ButtonPortFactory('button')
}

const models = {
  textNode: data => new IncomingTextNodeModel(data),
  variableNode: data => new VariableNodeModel(data),
  startNode: data => new StartNodeModel(data),
  outgoingText: data => new OutgoingTextNodeModel(data)
};
const hiddenNodes = {
  startNode: true
};

const Editor = () => {
  const { updateNode, updateLink, serialize, deserialize } = EditorStore;
  const [engine, setEngine] = useState(null);

  const [model, setModel] = useState(new DiagramModel());

  useEffect(() => {
    const subEngine = createEngine();

    for (const factoryName of Object.keys(nodeFactories)) {
      subEngine
        .getNodeFactories()
        .registerFactory(nodeFactories[factoryName]);
    }

    for (const factoryName of Object.keys(portFactories)) {
      subEngine
        .getPortFactories()
        .registerFactory(portFactories[factoryName]);
    }

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
    const TextNode = models.textNode({ title: 'TextNode' });

    TextNode.setPosition(650, 200);
    const comparisonPortTextNode = TextNode.getPort('comparisonText');

    model.addAll(TextNode);

    const TextNode2 = models.textNode({ title: 'TextNode #2' });

    TextNode2.setPosition(1150, 200);
    const comparisonPortTextNode2 = TextNode2.getPort('comparisonText');

    const textNodel1Out = TextNode.getPort('flowOut');
    const textNodel2In = TextNode2.getPort('flowIn');
    const linkFlow = textNodel1Out.link(textNodel2In);
    // incomingText outgoingMsg  incomingMsg
    // const textNodel1Text = TextNode.getPort('outgoingMsg');
    // const textNodel2Msg = TextNode2.getPort('incomingMsg');
    // const linkMsg = textNodel1Text.link(textNodel2Msg);

    model.addAll(TextNode2, linkFlow);

    const VariableNode = models.variableNode({ title: 'First', value: 'First' });
    const variableNodeOutPort = VariableNode.getPort('out');
    const link1 = comparisonPortTextNode.link(variableNodeOutPort);

    VariableNode.setPosition(460, 470);
    link1.addLabel('Авто-линк');

    model.addAll(VariableNode, link1);

    const VariableNode2 = models.variableNode({ title: 'Second', value: 'Second' });
    const variableNodeOutPort2 = VariableNode2.getPort('out');
    const link2 = comparisonPortTextNode2.link(variableNodeOutPort2);

    VariableNode2.setPosition(1000, 350);
    model.addAll(VariableNode2, link2);

    const StartNode = models.startNode();

    StartNode.setPosition(200, 200);
    const startFlowPort = StartNode.getPort('flowOut');
    const textNodel1In = TextNode.getPort('flowIn');
    const linkFlowStart = textNodel1In.link(startFlowPort);

    model.addAll(StartNode, linkFlowStart);

    // variableNodeOutPort.link(comparisonPortTextNode);
    // node3.addOutPort('Out3');
    // let link1 = variableNodeOutPort.link(comparisonPortTextNode);

    // link them and add a label to the link
    // const link = port1.link(port2);

    // link.addLabel('123');

    // model.addAll(TextNode, TextNode2);
  }, []);

  const removeNode = () => {
    const nodes = model.getNodes();

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
  const exportModel = () => {
    const serialized = model.serialize();

    Object.assign(serialized, serialize());
    console.log(serialized);
  };

  const { count, change } = store;
  const [data, setData] = useState([]);

  /*  useEffect(() => {
    const temp = count.map(obj => <Output key={obj.id} obj={obj} />);

    setData(temp);
  }, [count]); */

  /*
  useEffect(() => {
    console.log(fn(testModel));
  }, []);
*/

  const [modelElements, setModelElement] = useState([]);
  const handleDragStart = (event, modelName) => {
    event.dataTransfer.setData('modelName', modelName);
  };

  useEffect(() => {
    const reactElements = [];

    for (const modelName of Object.keys(models)) {
      if (!hiddenNodes[modelName]) {
        reactElements.push(
          <div
            className="ControlPanel__node"
            draggable
            onDragStart={event => handleDragStart(event, modelName)}
            key={`ControlPanel__node__${modelName}`}
          >
            {modelName}
          </div>
        );
      }
    }

    setModelElement(reactElements);
  }, []);

  const onNodeDrop = event => {
    const modelName = event.dataTransfer.getData('modelName');
    const Node = models[modelName]();
    const { x, y } = engine.getRelativeMousePoint(event);

    Node.setPosition(x, y);
    model.addAll(Node);
    // forceUpdate();
    engine.repaintCanvas();
  };
  const handleDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    return false;
  };

    const downloadModel = () => {
      axios.get('http://localhost:3000/algorithm')
        .then(res => {
          model.deserializeModel(res.data, engine);
          engine.setModel(model);
          deserialize(res.data.store);
        });
  }
  const saveModel = () => {
    const serialized = model.serialize();

    Object.assign(serialized, serialize());
    axios.patch('http://localhost:3000/algorithm', serialized)
  }

  return (
    <div
      className={classNames('test-wrapper')}
      onContextMenu={e => {
      // e.preventDefault();
      }}
    >
      <div className="ControlPanel">
        <button type="button" onClick={() => downloadModel()}>Download</button>
        <button type="button" onClick={() => exportModel()}>Serialize</button>
        <button type="button" onClick={() => saveModel()}>Save</button>
        <div className="ControlPanel__nodesList">
          {modelElements}
        </div>
      </div>
      <div
        style={{ height: '100%', width: '100%' }}
        onDrop={event => onNodeDrop(event)}
        onDragOver={handleDragOver}
      >
        {engine && <CanvasWidget engine={engine} className="canvas-widget" />}
      </div>
    </div>
  );
};

Editor.propTypes = {};

export default Editor;
