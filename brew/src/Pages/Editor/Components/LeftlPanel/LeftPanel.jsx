import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import './leftPanel.less';
import Collapsible from 'react-collapsible';

const LeftPanel = props => {
  const {
    downloadModel,
    serializeModel,
    saveModel,
    variables = []
  } = props;

  const collapseTrigger = (
    <div className="leftPanel__collapse__trigger">
      <div>
        <div className="leftPanel__collapse__trigger--title">VARIABLES</div>
      </div>
      <div className="leftPanel__collapse__trigger--add">⊕</div>
    </div>
  );

  const handleDragStart = (event, variableID) => {
    event.dataTransfer.setData('variableID', variableID);
  };

  const variablesContent = useMemo(() => {
    return variables.map(variable => (
      <div
        key={variable.id}
        draggable
        className="leftPanel__collapse__variable"
        onDragStart={event => handleDragStart(event, variable.id)}
      >
        {variable.title}
      </div>
    ));
  }, [variables]);

  return (
    <div className="leftPanel">
      <button type="button" onClick={downloadModel}>Download</button>
      <button type="button" onClick={serializeModel}>Serialize</button>
      <button type="button" onClick={saveModel}>Save</button>
      <div className="leftPanel__divider" />

      <Collapsible
        open
        className="leftPanel__collapsible"
        trigger={collapseTrigger}
        transitionTime={50}
      >
        {variablesContent}
      </Collapsible>
    </div>
  );
};

LeftPanel.propTypes = {
  saveModel: PropTypes.func,
  serializeModel: PropTypes.func,
  downloadModel: PropTypes.func
};
LeftPanel.defaultProps = {
  saveModel: () => {},
  serializeModel: () => {},
  downloadModel: () => {}
};
export default LeftPanel;
