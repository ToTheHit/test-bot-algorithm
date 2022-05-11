import createEngine from '@projectstorm/react-diagrams';
import axios from 'axios';

import { Toolkit } from '@projectstorm/react-canvas-core';
import { CommandManager, CommandHandlers } from './Actions/lib';
import { ZoomAction, UndoRedoAction, DeleteAction } from './Actions';
import { IncomingMediaNodeFactory, IncomingTextNodeFactory } from './Custom/Incoming/Factories';
import { VariableNodeFactory } from './Custom/Variables/Factories';
import StartNodeFactory from './Custom/Start/StartNodeFactory';
import { OutgoingTextNodeFactory } from './Custom/Outgoing/Factories';
import CustomNodeFactory from './Custom/lib/CustomNodeFactory';
import {
  ButtonPortFactory, FlowPortFactory, TextPortFactory, VariablePortFactory
} from './Custom/Ports';
import { SimpleLinkFactory } from './Custom/Links/Factories';
import CustomDiagramModel from './Custom/lib/CustomDiagramModel';
import { IncomingMediaNodeModel, IncomingTextNodeModel } from './Custom/Incoming/Models';
import { VariableNodeModel } from './Custom/Variables/Models';
import StartNodeModel from './Custom/Start/startNodeModel';
import { OutgoingTextNodeModel } from './Custom/Outgoing/Models';
import { States } from './States';

const nodeFactories = {
  textNode: new IncomingTextNodeFactory(),
  variableNode: new VariableNodeFactory(),
  startNode: new StartNodeFactory(),
  outgoingText: new OutgoingTextNodeFactory(),
  mediaNode: new IncomingMediaNodeFactory(),
  customNode: new CustomNodeFactory()
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

const systemNodes = {
  startNode: true
};
const allowedModelsList = { ...models };

for (const systemNode of Object.keys(systemNodes)) {
  delete allowedModelsList[systemNode];
}

export default class DiagramEngine {
  constructor(wrapperRef, contextControl) {
    this.wrapperRef = wrapperRef;
    this.contextControl = contextControl;
    this.engine = null;
    this.modelsList = allowedModelsList;
    this.offset = {
      x: '0px',
      y: '0px'
    };
    this.gridSize = 15;
    this.normalizedVariables = {};
    this.variableNodes = [];

    this.initializeEngine();
    this.initializeModel();

    this.initializeTestNodes();
    this.initializeTestVariables();
  }

  getEngine = () => this.engine;

  getModel = () => this.engine.getModel();

  getVariables = () => this.normalizedVariables;

  repaintCanvas = () => {
    this.engine.repaintCanvas();
  }

  initializeEngine = () => {
    this.engine = createEngine({
      registerDefaultDeleteItemsAction: false,
      registerDefaultZoomCanvasAction: false
    });

    this.engine.commands = new CommandManager();
    this.engine.registerListener(CommandHandlers(this));

    this.engine
      .getStateMachine()
      .pushState(new States());
    const actions = [
      // DuplicateAction,
      // ClipboardAction,
      DeleteAction,
      UndoRedoAction,
      ZoomAction
    ];

    actions.forEach(Action => this.engine
      .getActionEventBus()
      .registerAction(new Action(false)));

    for (const factoryName of Object.keys(nodeFactories)) {
      this.engine
        .getNodeFactories()
        .registerFactory(nodeFactories[factoryName]);
    }

    for (const factoryName of Object.keys(portFactories)) {
      this.engine
        .getPortFactories()
        .registerFactory(portFactories[factoryName]);
    }

    for (const factoryName of Object.keys(linkFactories)) {
      this.engine
        .getLinkFactories()
        .registerFactory(linkFactories[factoryName]);
    }
  };

  initializeModel = () => {
    const self = this;

    self.model = new CustomDiagramModel(self);

    self.model.setGridSize(this.gridSize);
    self.model.setLocked(false);
    self.model.registerListener({
      // linksUpdated(event) {
      //   updateLink(event.link, event.isCreated);
      // },
      // nodesUpdated(event) {
      //   updateNode(event.node);
      // },
      offsetUpdated({
        offsetX,
        offsetY
      }) {
        self.offset = {
          x: `${Math.round(offsetX)}px`,
          y: `${Math.round(offsetY)}px`
        };
        self.wrapperRef.current.style.setProperty('--offset-x', self.offset.x);
        self.wrapperRef.current.style.setProperty('--offset-y', self.offset.y);
      },
      zoomUpdated({ zoom }) {
        self.gridSize = (15 * zoom) / 100;
        self.wrapperRef.current.style.setProperty('--grid-size', `${self.gridSize}px`);
      }
    });

    this.getEngine().setModel(self.model);
    this.repaintCanvas();
  };

  initializeWrapperOptions = () => {
    this.wrapperRef.current.style.setProperty('--offset-x', this.offset.x);
    this.wrapperRef.current.style.setProperty('--offset-y', this.offset.y);
    this.wrapperRef.current.style.setProperty('--grid-size', `${this.gridSize}px`);
  }

  initializeTestNodes = () => {
    const TextNode = models.textNode({ title: 'TextNode' });

    TextNode.setPosition(650, 200);
    const comparisonPortTextNode = TextNode.getPort('comparisonText');

    this.getModel().addAll(TextNode);
    this.engine.fireEvent({ nodes: [TextNode] }, 'componentsAdded');

    const TextNode2 = models.textNode({ title: 'TextNode #2' });

    TextNode2.setPosition(1150, 200);
    const comparisonPortTextNode2 = TextNode2.getPort('comparisonText');

    const textNodel1Out = TextNode.getPort('flowOut');
    const textNodel2In = TextNode2.getPort('flowIn');
    // const linkFlow = textNodel1Out.link(textNodel2In);

    // this.getModel().addAll(TextNode2, linkFlow);
    this.getModel().addAll(TextNode2);
    this.engine.fireEvent({ nodes: [TextNode2] }, 'componentsAdded');

    const TextNode3 = models.textNode({ title: 'TextNode #3' });

    TextNode3.setPosition(1150, 500);
    this.getModel().addAll(TextNode3);

    this.engine.fireEvent({ nodes: [TextNode3] }, 'componentsAdded');

    const TextNode4 = models.textNode({ title: 'TextNode #4' });

    TextNode4.setPosition(650, 500);
    this.getModel().addAll(TextNode4);

    this.engine.fireEvent({ nodes: [TextNode4] }, 'componentsAdded');

    return;
    const VariableNode = models.variableNode({
      title: 'First',
      value: 'First'
    });
    const variableNodeOutPort = VariableNode.getPort('out');
    const link1 = comparisonPortTextNode.link(variableNodeOutPort);

    VariableNode.setPosition(460, 470);
    link1.addLabel('Авто-линк');

    this.getModel().addAll(VariableNode, link1);

    const VariableNode2 = models.variableNode({
      title: 'Second',
      value: 'Second'
    });
    const variableNodeOutPort2 = VariableNode2.getPort('out');
    const link2 = comparisonPortTextNode2.link(variableNodeOutPort2);

    VariableNode2.setPosition(1000, 350);
    this.getModel().addAll(VariableNode2, link2);

    const StartNode = models.startNode();

    StartNode.setPosition(200, 200);
    const startFlowPort = StartNode.getPort('flowOut');
    const textNodel1In = TextNode.getPort('flowIn');
    const linkFlowStart = textNodel1In.link(startFlowPort);

    this.getModel().addAll(StartNode, linkFlowStart);
    this.repaintCanvas();

    // variableNodeOutPort.link(comparisonPortTextNode);
    // node3.addOutPort('Out3');
    // let link1 = variableNodeOutPort.link(comparisonPortTextNode);

    // link them and add a label to the link
    // const link = port1.link(port2);

    // link.addLabel('123');

    // model.addAll(TextNode, TextNode2);
  }

  initializeTestVariables = () => {
    const variables = [];

    variables.push({
      id: Toolkit.UID(),
      value: 'TestValue',
      title: 'TestVariable',
      description: 'TestDescription'
    });
    variables.push({
      id: Toolkit.UID(),
      value: 'TestValue2',
      title: 'TestVariable2',
      description: 'TestDescription2'
    });

    this.normalizedVariables = variables.reduce((acc, variable) => {
      acc[variable.id] = variable;

      return acc;
    }, {});
    this.contextControl.setVariablesUpdatedOn(Date.now());
  }

  /*
   * 'fireEvent' param used for undo-redo
   */
  updateVariableOptions = (id, options, fireEvent = true) => {
    const before = {
      id,
      options: this.normalizedVariables[id]
    };

    this.normalizedVariables[id] = {
      ...this.normalizedVariables[id],
      ...options
    };
    const after = {
      id,
      options: this.normalizedVariables[id]
    };

    // TODO: Add this option to 'undo/redo'?
    //  Now this is only used for rerender leftPanel when variable options were updated
    this.contextControl.setVariablesUpdatedOn(Date.now());
    this.variableNodes.forEach(node => {
      if (node.options.data.id === id) {
        // eslint-disable-next-line no-param-reassign
        node.options.data = this.normalizedVariables[id];
      }
    });
    fireEvent && this.engine.fireEvent({ before, after }, 'variableOptionsUpdated');

    this.repaintCanvas();
  }

  addVariable = data => {
    const temp = {
      id: Toolkit.UID(),
      value: 'TestValue',
      title: 'TestVariable',
      description: 'TestDescription'
    };

    this.normalizedVariables[data?.id || temp.id] = data || temp;
    this.contextControl.setVariablesUpdatedOn(Date.now());
  }

  removeVariable = (id, fireEvent = true) => {
    const variableData = {
      variables: [this.normalizedVariables[id]],
      nodes: [],
      links: [],
      points: []
    };

    this.variableNodes.forEach(node => {
      if (node.options.data.id === id) {
        variableData.nodes.push(node);
      }
    });
    variableData.links = variableData.nodes.reduce(
      (arr, node) => [...arr, ...node.getAllLinks()],
      []
    )
      .map(link => ({
        id: link.getID(),
        points: link.getPoints(),
        targetEntity: {
          node: link.getTargetPort()?.getParent().getID(),
          port: link.getTargetPort()?.getID()
        },
        sourceEntity: {
          node: link.getSourcePort()?.getParent().getID(),
          port: link.getSourcePort()?.getID()
        }
      }));
    variableData.nodes.forEach(node => {
      node.remove();
    });

    delete this.normalizedVariables[id];
    this.setSelected([]);
    this.contextControl.setVariablesUpdatedOn(Date.now());

    fireEvent && this.engine.fireEvent(variableData, 'entitiesRemoved');
  }

  setSelected = selected => {
    if (!selected.length) {
      this.contextControl.setSelected(null);
    } else {
      this.contextControl.setSelected(selected);
    }
  }

  downloadModel = () => {
    axios.get('http://localhost:3000/algorithm')
      .then(res => {
        // this.engine.commands.clear();
        this.getModel().deserializeModel(res.data, this.getEngine());
        // this.getEngine().setModel(this.getModel());
        // or
        this.repaintCanvas();
      });
  }

  saveModel = () => {
    const serialized = this.getModel().serialize();

    axios.patch('http://localhost:3000/algorithm', serialized);
  }

  serializeModel = () => {
    const serialized = this.getModel().serialize();

    console.log(serialized);
  };

  addNode = (modelName, clientPosition = { clientX: 0, clientY: 0 }, options = {}) => {
    const node = models[modelName](options);

    if (modelName === 'variableNode') {
      this.variableNodes.push(node);
    }

    const {
      x,
      y
    } = this.getEngine().getRelativeMousePoint(clientPosition);

    node.setPosition(x, y);
    this.getModel().addAll(node);

    this.engine.fireEvent({ nodes: [node] }, 'componentsAdded');

    this.repaintCanvas();
  }
}
