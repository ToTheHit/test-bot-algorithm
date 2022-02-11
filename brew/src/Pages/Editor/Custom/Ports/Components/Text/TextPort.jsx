import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { PortWidget } from '@projectstorm/react-diagrams';
import PropTypes from 'prop-types';

import './textPort.less';
import classNames from '../../../../../../lib/classNames';

const TextPort = props => {
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
        'TextPort',
        { 'TextPort--right': align === 'right' },
        { 'TextPort--connected': isConnected }
      )}
    >
      <PortWidget
        port={node.getPort(name)}
        engine={engine}
      >
        <div
          className={classNames(
            'TextPort__connector',
            { 'TextPort__connector--right': align === 'right' }
          )}
          style={{ backgroundColor: color }}
        />
      </PortWidget>

      <div className={classNames('TextPort__label', { 'TextPort__label--right': align === 'right' })}>{label}</div>
    </div>

  );
};

TextPort.propTypes = {};
TextPort.defaultProps = {};
export default TextPort;
