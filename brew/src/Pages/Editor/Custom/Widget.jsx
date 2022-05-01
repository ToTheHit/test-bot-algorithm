import React from 'react';
import PropTypes from 'prop-types';
import { PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';

import './styles.less';

const CustomNodeWidget = props => {
  const { size, node, engine } = props;

  return (
    <div className="CustomNode">
      <PortWidget
        style={{
          left: size - 8,
          top: size / 2 - 8,
          position: 'absolute'
        }}
        port={node.getPort(PortModelAlignment.RIGHT)}
        engine={engine}
      >
        <div className="CustomNode__port" />
      </PortWidget>
      <PortWidget
        style={{
          top: size / 2 - 8,
          left: -8,
          position: 'absolute'
        }}
        port={node.getPort(PortModelAlignment.LEFT)}
        engine={engine}
      >
        <div className="CustomNode__port" />
      </PortWidget>
    </div>
  );
};

CustomNodeWidget.propTypes = {
  size: PropTypes.number
};

CustomNodeWidget.defaultProps = {
  size: 50
};

export default CustomNodeWidget;
