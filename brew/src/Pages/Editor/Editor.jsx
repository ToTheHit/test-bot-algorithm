import React, { useEffect, useState } from 'react';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';

import { CanvasWidget } from '@projectstorm/react-canvas-core';

import axios from 'axios';
import classNames from '../../lib/classNames';
import './editor.less';

import { IncomingMediaNodeFactory, IncomingTextNodeFactory } from './Custom/Incoming/Factories';
import { IncomingMediaNodeModel, IncomingTextNodeModel } from './Custom/Incoming/Models';

import { OutgoingTextNodeFactory } from './Custom/Outgoing/Factories';
import { OutgoingTextNodeModel } from './Custom/Outgoing/Models';

import { VariableNodeFactory } from './Custom/Variables/Factories';
import { VariableNodeModel } from './Custom/Variables/Models';

import StartNodeModel from './Custom/Start/startNodeModel';
import StartNodeFactory from './Custom/Start/StartNodeFactory';

import { SimpleLinkFactory } from './Custom/Links/Factories';

import {
  ButtonPortFactory, FlowPortFactory, TextPortFactory, VariablePortFactory
} from './Custom/Ports';

import ZoomAction from './Actions/ZoomAction';

import EditorStore from '../../mobx/EditorStore';

const nodeFactories = {
  textNode: new IncomingTextNodeFactory(),
  variableNode: new VariableNodeFactory(),
  startNode: new StartNodeFactory(),
  outgoingText: new OutgoingTextNodeFactory(),
  mediaNode: new IncomingMediaNodeFactory()
};

const portFactories = {
  textPort: new TextPortFactory('text'),
  flowPort: new FlowPortFactory('flow'),
  variablePort: new VariablePortFactory('variable'),
  buttonPort: new ButtonPortFactory('button')
};

const linkFactories = {
  simpleLink: new SimpleLinkFactory('simpleLink')
};

const models = {
  textNode: data => new IncomingTextNodeModel(data),
  variableNode: data => new VariableNodeModel(data),
  startNode: data => new StartNodeModel(data),
  outgoingText: data => new OutgoingTextNodeModel(data),
  mediaNode: data => new IncomingMediaNodeModel(data)
};
const hiddenNodes = {
  startNode: true
};

const Editor = function Editor() {
  const {
    serialize,
    deserialize
  } = EditorStore;
  const [engine, setEngine] = useState(null);

  const [model, setModel] = useState(new DiagramModel());
  const [offset, setOffset] = useState({ x: '0px', y: '0px' });
  const [gridSize, setGridSize] = useState('15px');

  useEffect(() => {
    const subEngine = createEngine({
      registerDefaultZoomCanvasAction: false
    });

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

    for (const factoryName of Object.keys(linkFactories)) {
      subEngine
        .getLinkFactories()
        .registerFactory(linkFactories[factoryName]);
    }
    const actions = [
      ZoomAction
    ];

    actions.forEach(Action => subEngine
      .getActionEventBus()
      .registerAction(new Action(false)));

    model.setGridSize(15);

    model.registerListener({
      // linksUpdated(event) {
      //   updateLink(event.link, event.isCreated);
      // },
      // nodesUpdated(event) {
      //   updateNode(event.node);
      // },
      offsetUpdated({ offsetX, offsetY }) {
        setOffset({
          x: `${Math.round(offsetX)}px`,
          y: `${Math.round(offsetY)}px`
        });
      },
      zoomUpdated({ zoom }) {
        setGridSize(`${(15 * zoom) / 100}px`);
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

    const VariableNode = models.variableNode({
      title: 'First',
      value: 'First'
    });
    const variableNodeOutPort = VariableNode.getPort('out');
    const link1 = comparisonPortTextNode.link(variableNodeOutPort);

    VariableNode.setPosition(460, 470);
    link1.addLabel('Авто-линк');

    model.addAll(VariableNode, link1);

    const VariableNode2 = models.variableNode({
      title: 'Second',
      value: 'Second'
    });
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
    const {
      x,
      y
    } = engine.getRelativeMousePoint(event);

    Node.setPosition(x, y);
    model.addAll(Node);
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
  };
  const saveModel = () => {
    const serialized = model.serialize();

    Object.assign(serialized, serialize());
    axios.patch('http://localhost:3000/algorithm', serialized);
  };

  return (
    <div
      className={classNames('test-wrapper')}
      style={{
        '--offset-x': offset.x,
        '--offset-y': offset.y,
        '--grid-size': gridSize
      }}
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
        style={{
          height: '100%',
          width: '100%'
        }}
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
