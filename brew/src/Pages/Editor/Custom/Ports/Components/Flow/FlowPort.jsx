import React from 'react';
import PropTypes from 'prop-types';
import './flowPort.less';
import { PortWidget } from '@projectstorm/react-diagrams';
import classNames from '../../../../../../lib/classNames';

const FlowPort = props => {
  const {
    engine,
    node,
    name,
    portStatus: isConnected
  } = props;

  return (
    <PortWidget
      port={node.getPort(name)}
      engine={engine}
      name={name}
    >
      <div
        className={classNames('FlowPort', { 'FlowPort--inactive': !isConnected })}
      />
    </PortWidget>
  );
};

FlowPort.propTypes = {};
FlowPort.defaultProps = {};
export default FlowPort;
