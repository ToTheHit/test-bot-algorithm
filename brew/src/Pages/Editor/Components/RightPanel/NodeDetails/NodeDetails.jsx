import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './nodeDetails.less';
import CustomNodeModel from '../../../Custom/lib/CustomNodeModel';

const NodeDetails = props => {
  const { node } = props;

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
        const options = entityOptionsRef.current;

        delete options.selected;

        node.updateOptions(options);
      }
    };
  }, []);

  const handleChange = event => {
    const field = event.target.attributes.getNamedItem('data-field').value;

    setEntityOptions({
      ...entityOptions,
      [field]: event.target.value
    });
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
        defaultValue={node.options.title}
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
