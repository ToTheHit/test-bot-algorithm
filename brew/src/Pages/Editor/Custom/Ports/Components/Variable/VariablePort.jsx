import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { PortWidget } from '@projectstorm/react-diagrams';
import PropTypes from 'prop-types';

import './variablePort.less';
import classNames from '../../../../../../lib/classNames';

const VariablePort = props => {
  // eslint-disable-next-line react/prop-types
  const {
    node,
    engine,
    name,
    align,
    portStatus: isConnected
  } = props;

  return (
    <div
      className={classNames(
        'VariablePort',
        { 'VariablePort--right': align === 'right' },
        { 'VariablePort--connected': isConnected }
      )}
    >
      <PortWidget
        port={node.getPort(name)}
        engine={engine}
        className={classNames(
          'VariablePort__connector',
          { 'VariablePort__connector--right': align === 'right' }
        )}
      >
        <div

        />
      </PortWidget>
    </div>

  );
};

VariablePort.propTypes = {};
VariablePort.defaultProps = {};
export default VariablePort;
