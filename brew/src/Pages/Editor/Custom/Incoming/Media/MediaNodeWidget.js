import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import './mediaNode.less';
import EditorStore from '../../../../../mobx/EditorStore';
import { FlowPort, TextPort } from '../../Ports/Components';
import classNames from '../../../../../lib/classNames';

const MediaNodeWidget = props => {
  // eslint-disable-next-line react/prop-types
  const { node = {}, engine } = props;
  const { portStatus } = EditorStore;

  // const memoizedComponent = useMemo(() => {
  //   return <div className={classNames('MediaNode', { 'MediaNode--selected': node.isSelected() })}>
  //     <div className="MediaNode__header">
  //       <div className="MediaNode__type" />
  //       <div className="MediaNode__title">{node.title}</div>
  //     </div>
  //     <div className="MediaNode__flowPorts">
  //       <FlowPort
  //         engine={engine}
  //         node={node}
  //         name="flowIn"
  //         portStatus={portStatus[node.getPort('flowIn').options.id]}
  //       />
  //       <FlowPort
  //         engine={engine}
  //         node={node}
  //         name="flowOut"
  //         portStatus={portStatus[node.getPort('flowOut').options.id]}
  //       />
  //     </div>
  //   </div>
  // }, [node.isSelected()])

  return (
    <div className={classNames('MediaNode', { 'MediaNode--selected': node.isSelected() })}>
      <div className="MediaNode__header">
        <div className="MediaNode__type" />
        <div className="MediaNode__title">{node.title}</div>
      </div>
      <div className="MediaNode__flowPorts">
        <FlowPort
          engine={engine}
          node={node}
          name="flowIn"
          portStatus={portStatus[node.getPort('flowIn').options.id]}
        />
        <FlowPort
          engine={engine}
          node={node}
          name="flowOut"
          portStatus={portStatus[node.getPort('flowOut').options.id]}
        />
      </div>
    </div>
  );
};

MediaNodeWidget.propTypes = {
};

MediaNodeWidget.defaultProps = {
  size: 50
};

export default MediaNodeWidget;
