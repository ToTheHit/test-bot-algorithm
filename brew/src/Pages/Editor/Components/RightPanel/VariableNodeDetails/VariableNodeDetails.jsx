import React, {
  useEffect, useState, useRef, useMemo
} from 'react';
import PropTypes from 'prop-types';
import './variableNodeDetails.less';
import CustomNodeModel from '../../../Custom/lib/CustomNodeModel';
import DiagramEngine from '../../../DiagramEngine';

const VariableNodeDetails = props => {
  const { node, engine } = props;

  const [entityOptions, setEntityOptions] = useState(node.options);
  const [needUpdate, setNeedUpdate] = useState(false);

  const entityOptionsRef = useRef();
  const needUpdateRef = useRef();

  useEffect(() => {
    entityOptionsRef.current = entityOptions;
    needUpdateRef.current = needUpdate;
  }, [entityOptions, needUpdate]);

  useEffect(() => {
    return () => {
      if (needUpdateRef.current) {
        const options = entityOptionsRef.current.data;

        engine.updateVariableOptions(node.options.data.id, options);
      }
    };
  }, []);

  const handleChange = event => {
    const field = event.target.attributes.getNamedItem('data-field').value;

    entityOptions.data[field] = event.target.value;
    setEntityOptions(entityOptions);
    setNeedUpdate(true);
  };

  const updateOptions = () => {
    const options = entityOptionsRef.current.data;

    engine.updateVariableOptions(node.options.data.id, options);

    setNeedUpdate(false);
  };

  const handleRemove = () => {
    engine.removeVariable(node.options.data.id);
  };

  const variableData = useMemo(() => {
    return (
      <div className="NodeDetails">
        {node.options.data.value}
        <div className="NodeDetails__title">Title</div>
        <input
          key={`nodeDetails_${node.options.id}_title`}
          className="NodeDetails__title--editor"
          data-field="title"
          onChange={handleChange}
          defaultValue={node.options.data.title}
          onBlur={updateOptions}
        />
        <div className="NodeDetails__title">Value</div>
        <input
          key={`nodeDetails_${node.options.id}_value`}
          className="NodeDetails__title--editor"
          data-field="value"
          onChange={handleChange}
          defaultValue={node.options.data.value}
          onBlur={updateOptions}
        />

        <div className="NodeDetails__title">Description</div>
        <input
          key={`nodeDetails_${node.options.id}_description`}
          className="NodeDetails__title--editor"
          data-field="description"
          onChange={handleChange}
          defaultValue={node.options.data.description}
          onBlur={updateOptions}
        />
        <br />
        <div className="rightPanel__divider" />
        <br />
        <button
          type="button"
          style={{ color: 'black' }}
          onClick={handleRemove}
        >
          Remove variable
        </button>
      </div>
    );
  }, [node.options.id]);

  return (
    <>
      {variableData}
    </>
  );
};

VariableNodeDetails.propTypes = {
  node: PropTypes.instanceOf(CustomNodeModel),
  engine: PropTypes.instanceOf(DiagramEngine)
};
VariableNodeDetails.defaultProps = {
  node: [],
  engine: null
};
export default VariableNodeDetails;
