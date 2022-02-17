import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { PortWidget } from '@projectstorm/react-diagrams';
import PropTypes from 'prop-types';

import './buttonPort.less';
import classNames from '../../../../../../lib/classNames';

const ButtonPort = props => {
  // eslint-disable-next-line react/prop-types
  const {
    node,
    engine,
    name,
    align,
    color,
    label,
    port,
    links,
    portStatus: isConnected
  } = props;

  return (
    <div
      className={classNames(
        'ButtonPort',
        { 'ButtonPort--right': align === 'right' },
        { 'ButtonPort--connected': isConnected }
      )}
    >
      <PortWidget
        port={node.getPort(name)}
        engine={engine}
      >
        <div
          className={classNames(
            'ButtonPort__connector',
            { 'ButtonPort__connector--right': align === 'right' }
          )}
          style={{ backgroundColor: color }}
        />
      </PortWidget>

      <div className={classNames('ButtonPort__label', { 'ButtonPort__label--right': align === 'right' })}>{label}</div>
    </div>

  );
};

ButtonPort.propTypes = {};
ButtonPort.defaultProps = {};
export default ButtonPort;
