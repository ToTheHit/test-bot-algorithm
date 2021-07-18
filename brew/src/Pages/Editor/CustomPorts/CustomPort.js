import React, { useEffect, useRef, useState } from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';

import classNames from '../../../lib/classNames';
import customPort from './customPort.less';

const CustomPort = props => {
  const { port, engine } = props;

  console.log('>>> port', port);
  console.log('>>> engine', engine);
  const Port = (
    <PortWidget port={port} engine={engine}>
      <div className="customPort" />
    </PortWidget>
  );

  const Label = <div className="customLabel">{port.getOptions().label}</div>;

  return (
    <div className={classNames('CustomPortLabel')}>
      {port.getOptions().in ? Port : Label}
      {port.getOptions().in ? Label : Port}
    </div>
  );
};

CustomPort.propTypes = {};

export default CustomPort;
