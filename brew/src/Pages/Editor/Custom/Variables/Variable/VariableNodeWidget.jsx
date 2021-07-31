import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './variableNode.less';
import EditorStore from '../../../../../mobx/EditorStore';
import { FlowPort, TextPort, VariablePort } from '../../Ports/Components';
import classNames from '../../../../../lib/classNames';

const VariableNodeWidget = props => {
  // eslint-disable-next-line react/prop-types
  const { node, engine } = props;
  const { portStatus } = EditorStore;

  const [align, setAlign] = useState('right');
  const [title, setTitle] = useState('Title Variable');

  return (
    <div className={classNames('VariableNode', { 'VariableNode--selected': node.isSelected() })}>
      <div className="VariableNode__title">{title}</div>
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
