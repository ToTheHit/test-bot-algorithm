import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './nodeDetails.less';
import CustomNodeModel from '../../../Custom/lib/CustomNodeModel';

const NodeDetails = props => {
  const { node } = props;
  const { title, description } = node.options.data;

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

        node.updateOptions(options);
      }
    };
  }, []);

  const handleChange = event => {
    const field = event.target.attributes.getNamedItem('data-field').value;

    entityOptions.data[field] = event.target.value;
    setEntityOptions(entityOptions);
    setNeedUpdate(true);
  };

  const updateOptions = e => {
    if (needUpdateRef.current) {
      node.updateOptions(entityOptions);
      setNeedUpdate(false);
    }
  };

  return (
    <div className="NodeDetails">
      {/* {node.getID()} */}
      <div className="NodeDetails__title">Title</div>
      <input
        className="NodeDetails__title--editor"
        data-field="title"
        onChange={e => handleChange(e)}
        defaultValue={title}
        onBlur={updateOptions}
      />
      <div className="NodeDetails__title">Description</div>
      <input
        className="NodeDetails__title--editor"
        data-field="description"
        onChange={e => handleChange(e)}
        defaultValue={description}
        onBlur={updateOptions}
      />
    </div>
  );
};

NodeDetails.propTypes = {
  node: PropTypes.instanceOf(CustomNodeModel)
};
NodeDetails.defaultProps = {
  node: []
};
export default NodeDetails;
