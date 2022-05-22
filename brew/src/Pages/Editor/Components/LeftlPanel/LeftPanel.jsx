import React, {
  useState, useEffect, useMemo, useContext
} from 'react';
import PropTypes from 'prop-types';
import './leftPanel.less';
import Collapsible from 'react-collapsible';
import { VariablesContext } from '../../Contexts';
import classNames from '../../../../lib/classNames';
import DetailsContext from '../../Contexts/DetailsContext';
import { VariableNodeModel } from '../../Custom/Variables/Models';

const LeftPanel = props => {
  const {
    downloadModel,
    serializeModel,
    saveModel,
    variables = {},
    addVariable
  } = props;
  const [variablesUpdatedOn] = useContext(VariablesContext);
  const [selected, setSelected] = useState(null);
  const [context, setContext] = useContext(DetailsContext);

  useEffect(() => {
    if (selected && context?.length) {
      if (context[0].options?.data?.id !== selected) {
        setSelected(null);
      }
    } else if (!context || context?.length === 0) {
      setSelected(null);
    }
  }, [context]);

  useEffect(() => {
    if (selected) {
      if (context?.length) {
        context.forEach(node => {
          node.options.selected = false;
        });
      }
      const variableModel = new VariableNodeModel(variables[selected]);

      setContext([...[variableModel]]);
    }
  }, [selected]);

  const handleDragStart = (event, variableID) => {
    event.dataTransfer.setData('variableID', variableID);
  };
  const handleSelect = event => {
    setSelected(event.target.attributes.getNamedItem('data-id').value);
  };
  const handleAddVariable = event => {
    event.stopPropagation();
    addVariable();
  };

  const collapseTrigger = (
    <div className="leftPanel__collapse__trigger">
      <div>
        <div className="leftPanel__collapse__trigger--title">VARIABLES</div>
      </div>
      <div
        className="leftPanel__collapse__trigger--add"
        onClick={handleAddVariable}
      >
        ⊕
      </div>
    </div>
  );

  const variablesContent = useMemo(() => {
    return Object.values(variables).map(variable => (
      <div
        key={variable.id}
        data-id={variable.id}
        onClick={handleSelect}
        draggable
        className={
          classNames(
            'leftPanel__collapse__variable',
            {
              'leftPanel__collapse__variable--selected': selected === variable.id
            }
          )
        }
        onDragStart={event => handleDragStart(event, variable.id)}
      >
        {variable.title}
      </div>
    ));
  }, [variablesUpdatedOn, selected]);

  return (
    <div className="leftPanel">
      <button type="button" onClick={downloadModel}>Download</button>
      <button type="button" onClick={serializeModel}>Serialize</button>
      <button type="button" onClick={saveModel}>Save</button>
      {/* <button type="button" onClick={getVariables}>Get Variables</button> */}
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
  downloadModel: PropTypes.func,
  variables: PropTypes.instanceOf(Object),
  addVariable: PropTypes.func
};
LeftPanel.defaultProps = {
  saveModel: () => {},
  serializeModel: () => {},
  downloadModel: () => {},
  variables: {},
  addVariable: () => {}
};
export default LeftPanel;
