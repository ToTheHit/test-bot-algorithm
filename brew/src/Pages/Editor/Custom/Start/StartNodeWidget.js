import React from 'react';
import classNames from '../../../../lib/classNames';
import EditorStore from '../../../../mobx/EditorStore';
import { FlowPort } from '../Ports/Components';

import './startNode.less';

const StartNodeWidget = props => {
  const { node, engine } = props;
  const { portStatus } = EditorStore;

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
