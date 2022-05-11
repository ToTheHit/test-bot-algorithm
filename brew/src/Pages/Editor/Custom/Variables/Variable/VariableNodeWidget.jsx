import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './variableNode.less';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { VariablePort } from '../../Ports/Components';
import classNames from '../../../../../lib/classNames';
import DetailsContext from '../../../Contexts/DetailsContext';
import { VariableNodeModel } from '../Models';

const VariableNodeWidget = props => {
  const { node, engine } = props;
  const [context, setContext] = useContext(DetailsContext);

  return (
    <div
      className={classNames('VariableNode', { 'VariableNode--selected': node.isSelected() })}
      onClick={() => {
        const updatedContext = context || [];

        updatedContext.push(node);
        setContext(updatedContext);
      }}
    >
      <div className="VariableNode__title">
        {node.options.data.title}
      </div>
      <VariablePort
        engine={engine}
        node={node}
        name="out"
        portStatus={node.getPort('out').options.isConnected}
        label="test"
        align="right"
      />
    </div>
  );
};

VariableNodeWidget.propTypes = {
  node: PropTypes.instanceOf(VariableNodeModel),
  engine: PropTypes.instanceOf(DiagramEngine)
};

VariableNodeWidget.defaultProps = {
  node: null,
  engine: null
};

export default VariableNodeWidget;
