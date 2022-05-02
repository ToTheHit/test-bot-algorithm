import React, {
  useEffect, useState
} from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

import classNames from '../../lib/classNames';
import './editor.less';

import EditorStore from '../../mobx/EditorStore';
import EditorMenuContext from './ContextMenu/EditorMenuContext';
import DiagramEngine from './DiagramEngine';

const Editor = () => {
  const {
    toggleMenu
  } = EditorStore;
  const [diagramEngine, setDiagramEngine] = useState(null);

  // const undoRedoListener = useCallback(event => {
  //   if (event.keyCode === 90 && event.ctrlKey && !event.shiftKey) {
  //     console.log('keydown UNDO');
  //
  //     // @ts-ignore
  //     // eslint-disable-next-line no-undef
  //     window.commandManager.undo();
  //
  //     engine.repaintCanvas();
  //   }
  //
  //   if (event.keyCode === 90 && event.ctrlKey && event.shiftKey) {
  //     console.log('keydown REDO');
  //
  //     // @ts-ignore
  //     // eslint-disable-next-line no-undef
  //     window.commandManager.redo();
  //
  //     engine.repaintCanvas();
  //   }
  // }, [engine]);
  // useEffect(() => {
  //   window.commandManager = new CommandManager();
  //   window.addEventListener('keydown', undoRedoListener);
  //
  //   return () => {
  //     window.removeEventListener('keydown', undoRedoListener);
  //   };
  // }, [engine]);

  const [offset, setOffset] = useState({
    x: '0px',
    y: '0px'
  });
  const [gridSize, setGridSize] = useState(15);

  useEffect(() => {
    setDiagramEngine(new DiagramEngine(setGridSize, setOffset));
  }, []);
  /*
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
    subEngine.commands = new CommandManager();

    const actions = [
      ZoomAction,
      UndoRedoAction
    ];

    actions.forEach(Action => subEngine
      .getActionEventBus()
      .registerAction(new Action(false)));

    model.setGridSize(15);

    // model.registerListener({
    //   // linksUpdated(event) {
    //   //   updateLink(event.link, event.isCreated);
    //   // },
    //   // nodesUpdated(event) {
    //   //   updateNode(event.node);
    //   // },
    //   offsetUpdated({
    //     offsetX,
    //     offsetY
    //   }) {
    //     setOffset({
    //       x: `${Math.round(offsetX)}px`,
    //       y: `${Math.round(offsetY)}px`
    //     });
    //   },
    //   zoomUpdated({ zoom }) {
    //     setGridSize(`${(15 * zoom) / 100}px`);
    //   }
    // });

    subEngine.setModel(model);
    setDiagramEngine(subEngine);
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
*/

  if (!diagramEngine) {
    return <div />;
  }

  return (
    <div
      className={classNames('test-wrapper')}
      style={{
        '--offset-x': offset.x,
        '--offset-y': offset.y,
        '--grid-size': `${gridSize}px`
      }}
    >
      <div className="ControlPanel">
        <button type="button" onClick={diagramEngine.downloadModel}>Download</button>
        <button type="button" onClick={diagramEngine.exportModel}>Serialize</button>
        <button type="button" onClick={diagramEngine.saveModel}>Save</button>
      </div>
      <div
        style={{
          height: '100%',
          width: '100%'
        }}
        onContextMenu={e => {
          e.preventDefault();
          toggleMenu(true, { x: e.clientX, y: e.clientY }, 'editor');
        }}
      >
        {diagramEngine && <CanvasWidget engine={diagramEngine.getEngine()} className="canvas-widget" />}
      </div>
      <EditorMenuContext addModel={diagramEngine.addNode} values={Object.keys(diagramEngine.modelsList)} />
    </div>
  );
};

Editor.propTypes = {};

export default Editor;
