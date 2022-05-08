import React, {
  useEffect, useRef, useState
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

  const wrapperRef = useRef(null);

  useEffect(() => {
    const engine = new DiagramEngine(wrapperRef);

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

  return (
    <div
      className={classNames('test-wrapper')}
      // Offset and grid size controlled by DiagramEngine
      ref={wrapperRef}
    >
      <div className="ControlPanel">
        <button type="button" onClick={diagramEngine.downloadModel}>Download</button>
        <button type="button" onClick={diagramEngine.serializeModel}>Serialize</button>
        <button type="button" onClick={diagramEngine.saveModel}>Save</button>
      </div>
      <div
        style={{ // TODO: Move to css file
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
