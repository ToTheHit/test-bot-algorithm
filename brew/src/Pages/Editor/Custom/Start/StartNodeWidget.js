import React from 'react';
import classNames from '../../../../lib/classNames';
import { FlowPort } from '../Ports/Components';

import './startNode.less';

const StartNodeWidget = props => {
  const { node, engine } = props;

  return (
    <div className={classNames('StartNode', { 'StartNode--selected': node.isSelected() })}>
      <div className="StartNode__header">
        <div className="StartNode__type" />
        <div className="StartNode__title">Start</div>
      </div>
      <div className="StartNode__flowPorts">
        <FlowPort
          engine={engine}
          node={node}
          name="flowOut"
          portStatus={node.getPort('flowOut').options.isConnected}
        />
      </div>
    </div>
  );
};

export default StartNodeWidget;
