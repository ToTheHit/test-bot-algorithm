import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import './textNode.less';
import EditorStore from '../../../../../mobx/EditorStore';
import { FlowPort, TextPort } from '../../Ports/Components';
import classNames from '../../../../../lib/classNames';

const TextNodeWidget = props => {
  // eslint-disable-next-line react/prop-types
  const { node, engine } = props;
  const { portStatus } = EditorStore;

  const memoizedComponent = useMemo(() => {
    return (
<div className={classNames('OutgoingTextNode', { 'OutgoingTextNode--selected': node.isSelected() })}>
      <div className="OutgoingTextNode__header">
        <div className="OutgoingTextNode__type" />
        <div className="OutgoingTextNode__title">{node.title}</div>
      </div>
      <div className="OutgoingTextNode__flowPorts">
        <FlowPort
          engine={engine}
          node={node}
          name="flowIn"
          portStatus={node.getPort('flowIn').options.isConnected}
        />
        <FlowPort
          engine={engine}
          node={node}
          name="flowOut"
          portStatus={node.getPort('flowOut').options.isConnected}
        />
      </div>
      <div className="OutgoingTextNode__contentPorts">
        <div className="OutgoingTextNode__contentPorts__left">
          <TextPort
            port={node.getPort('outgoingText')}
            node={node}
            engine={engine}
            name="outgoingText"
            align="left"
            color="#EDEDED"
            label="Текст для отправки"
            portStatus={node.getPort('outgoingText').options.isConnected}
          />
        </div>
      </div>
    </div>
)
  }, [node.isSelected()]);


  return (
    <div className={classNames('OutgoingTextNode', { 'OutgoingTextNode--selected': node.isSelected() })}>
      <div className="OutgoingTextNode__header">
        <div className="OutgoingTextNode__type" />
        <div className="OutgoingTextNode__title">{node.title}</div>
      </div>
      <div className="OutgoingTextNode__flowPorts">
        <FlowPort
          engine={engine}
          node={node}
          name="flowIn"
          portStatus={node.getPort('flowIn').options.isConnected}
        />
        <FlowPort
          engine={engine}
          node={node}
          name="flowOut"
          portStatus={node.getPort('flowOut').options.isConnected}
        />
      </div>
      <div className="OutgoingTextNode__contentPorts">
        <div className="OutgoingTextNode__contentPorts__left">
          <TextPort
            port={node.getPort('outgoingText')}
            node={node}
            engine={engine}
            name="outgoingText"
            align="left"
            color="#EDEDED"
            label="Текст для отправки"
            portStatus={node.getPort('outgoingText').options.isConnected}
          />
        </div>
      </div>
    </div>
  );
};

TextNodeWidget.propTypes = {
};

TextNodeWidget.defaultProps = {
  size: 50
};

export default TextNodeWidget;
