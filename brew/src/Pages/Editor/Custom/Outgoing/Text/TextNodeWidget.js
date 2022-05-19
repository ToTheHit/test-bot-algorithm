import React, {
  useMemo, useContext
} from 'react';
import PropTypes from 'prop-types';

import './textNode.less';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { FlowPort, TextPort } from '../../Ports/Components';
import classNames from '../../../../../lib/classNames';
import DetailsContext from '../../../Contexts/DetailsContext';
import { OutgoingTextNodeModel } from '../Models';

const TextNodeWidget = props => {
  const { node, engine } = props;
  const [context, setContext] = useContext(DetailsContext);

  /*
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
    );
  }, [node.isSelected()]);
   */
  return (
    <div
      className={classNames('OutgoingTextNode', { 'OutgoingTextNode--selected': node.isSelected() })}
      onClick={() => {
        const updatedContext = context || [];

        updatedContext.push(node);
        setContext(updatedContext);
      }}
    >
      <div className="OutgoingTextNode__header">
        <div className="OutgoingTextNode__type" />
        <div className="OutgoingTextNode__title">{node.options.data.title || 'OutgoingTextNode'}</div>
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
  node: PropTypes.instanceOf(OutgoingTextNodeModel),
  engine: PropTypes.instanceOf(DiagramEngine)
};

TextNodeWidget.defaultProps = {
  node: null,
  engine: null
};

export default TextNodeWidget;
