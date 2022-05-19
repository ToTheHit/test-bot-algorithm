import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './mediaNode.less';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { FlowPort } from '../../Ports/Components';
import classNames from '../../../../../lib/classNames';
import { IncomingMediaNodeModel, IncomingTextNodeModel } from '../Models';
import DetailsContext from '../../../Contexts/DetailsContext';

const MediaNodeWidget = props => {
  const { node = {}, engine } = props;
  const [context, setContext] = useContext(DetailsContext);

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
    <div
      className={classNames('MediaNode', { 'MediaNode--selected': node.isSelected() })}
      onClick={() => {
        const updatedContext = context || [];

        updatedContext.push(node);
        setContext(updatedContext);
      }}
    >
      <div className="MediaNode__header">
        <div className="MediaNode__type" />
        <div className="MediaNode__title">{node.options.data.title || 'MediaNode'}</div>
      </div>
      <div className="MediaNode__flowPorts">
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
    </div>
  );
};

MediaNodeWidget.propTypes = {
  node: PropTypes.instanceOf(IncomingMediaNodeModel),
  engine: PropTypes.instanceOf(DiagramEngine)
};

MediaNodeWidget.defaultProps = {
  node: null,
  engine: null
};

export default MediaNodeWidget;
