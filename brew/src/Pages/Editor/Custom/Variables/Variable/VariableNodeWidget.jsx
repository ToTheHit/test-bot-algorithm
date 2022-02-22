import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './variableNode.less';
import EditorStore from '../../../../../mobx/EditorStore';
import { FlowPort, TextPort, VariablePort } from '../../Ports/Components';
import classNames from '../../../../../lib/classNames';
import useDebounce from '../../../../../lib/useDebounce';

const VariableNodeWidget = props => {
  // eslint-disable-next-line react/prop-types
  const { node, engine } = props;
  const { portStatus } = EditorStore;

  const areaRef = useRef(null);

  const [align, setAlign] = useState('right');
  const [value, setValue] = useState(node.title || 'Title Variable');
  const [prevDebouncedValue, setPrevDebouncedValue] = useState(node.title || 'Title Variable');

  const debouncedValue = useDebounce(value, 2000);

  useEffect(() => {
    function handleText(event) {
      event.stopPropagation();
    }

    if (areaRef && areaRef.current) {
      areaRef.current.addEventListener('keydown', handleText, false);
    }
  }, []);

  useEffect(() => {
    if (debouncedValue !== prevDebouncedValue) {
      setPrevDebouncedValue(debouncedValue);
      node.value = debouncedValue;
    }
  }, [debouncedValue]);

  const onChange = event => {
    setValue(event.target.value);
  };

  // TODO: Переделать изменение value в отдельное меню
  return (
    <div className={classNames('VariableNode', { 'VariableNode--selected': node.isSelected() })}>
      <div className="VariableNode__title">
        {/* {title} */}
        <textarea
          ref={areaRef}
          value={value}
          onChange={onChange}
        />
      </div>
      <VariablePort
        engine={engine}
        node={node}
        name="out"
        portStatus={portStatus[node.getPort('out').options.id]}
        label="test"
        align={align}
      />
    </div>
  );
};

VariableNodeWidget.propTypes = {
};

VariableNodeWidget.defaultProps = {
  size: 50
};

export default VariableNodeWidget;
