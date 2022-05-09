import React, {
  useEffect, useRef, useState
} from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import DetailsContext from './Contexts/DetailsContext';
import './editor.less';

import EditorStore from '../../mobx/EditorStore';
import EditorMenuContext from './Components/EditorContextMenu/EditorMenuContext';
import DiagramEngine from './DiagramEngine';
import LeftPanel from './Components/LeftlPanel/LeftPanel';
import RightPanel from './Components/RightPanel/RightPanel';

const Editor = () => {
  const {
    toggleMenu
  } = EditorStore;
  const [diagramEngine, setDiagramEngine] = useState(null);
  const [context, setContext] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const engine = new DiagramEngine(wrapperRef, { context, setContext });

    setDiagramEngine(engine);
  }, []);

  useEffect(() => {
    if (diagramEngine) {
      diagramEngine.initializeWrapperOptions();
    }
  }, [diagramEngine]);

  if (!diagramEngine) {
    return <div />;
  }

  const onDrop = event => {
    const variableID = event.dataTransfer.getData('variableID');
    const variableData = diagramEngine.getVariables()[variableID];

    diagramEngine.addNode('variableNode', { clientX: event.clientX, clientY: event.clientY }, variableData);
  };

  const handleDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    return false;
  };

  return (
    <div
      className="test-wrapper"
      // Offset and grid size controlled by DiagramEngine
      ref={wrapperRef}
    >
      <DetailsContext.Provider value={[context, setContext]}>
        <LeftPanel
          serializeModel={diagramEngine.serializeModel}
          downloadModel={diagramEngine.downloadModel}
          saveModel={diagramEngine.saveModel}
          variables={diagramEngine.variables}
        />
        <div
          style={{ // TODO: Move to css file
            height: '100%',
            width: '100%'
          }}
          onContextMenu={e => {
            e.preventDefault();
            toggleMenu(true, { x: e.clientX, y: e.clientY }, 'editor');
          }}
          onDrop={event => onDrop(event)}
          onDragOver={handleDragOver}
        >
          {diagramEngine && <CanvasWidget engine={diagramEngine.getEngine()} className="canvas-widget" />}
        </div>
        <RightPanel />
        <EditorMenuContext addNode={diagramEngine.addNode} values={Object.keys(diagramEngine.modelsList)} />
      </DetailsContext.Provider>

    </div>
  );
};

Editor.propTypes = {};

export default Editor;
