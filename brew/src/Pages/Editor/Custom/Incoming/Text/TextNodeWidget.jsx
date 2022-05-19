import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import DetailsContext from '../../../Contexts/DetailsContext';

import './textNode.less';
import { FlowPort, TextPort } from '../../Ports/Components';
import classNames from '../../../../../lib/classNames';
import { IncomingTextNodeModel } from '../Models';

const TextNodeWidget = props => {
  const { node, engine } = props;

  // useEffect(() => {
  //   console.log('>>> node', node);
  // }, [node.options._updatedOn]);
  // const memoizedComponent = useMemo(() => {
  //   return (
  //     <div className={classNames('TextNode', { 'TextNode--selected': node.isSelected() })}>
  //       <div className="TextNode__header">
  //         <div className="TextNode__type" />
  //         <div className="TextNode__title">{node.title}</div>
  //       </div>
  //       <div className="TextNode__flowPorts">
  //         <FlowPort
  //           engine={engine}
  //           node={node}
  //           name="flowIn"
  //           portStatus={node.getPort('flowIn').options.isConnected}
  //         />
  //         <FlowPort
  //           engine={engine}
  //           node={node}
  //           name="flowOut"
  //           portStatus={node.getPort('flowOut').options.isConnected}
  //         />
  //       </div>
  //       <div className="TextNode__contentPorts">
  //         <div className="TextNode__contentPorts__left">
  //           {/*          <TextPort
  //           port={node.getPort('incomingMsg')}
  //           node={node}
  //           engine={engine}
  //           name="incomingMsg"
  //           align="left"
  //           color="#7FFF6A"
  //           label="Сообщение"
  //           portStatus={portStatus[node.getPort('incomingMsg').options.id]}
  //         /> */}
  //           <TextPort
  //             port={node.getPort('comparisonText')}
  //             node={node}
  //             engine={engine}
  //             name="comparisonText"
  //             align="left"
  //             color="#EDEDED"
  //             label="Текст для сравнения"
  //             portStatus={node.getPort('comparisonText').options.isConnected}
  //           />
  //           <TextPort
  //             port={node.getPort('button')}
  //             node={node}
  //             engine={engine}
  //             name="button"
  //             align="left"
  //             color="#EDEDED"
  //             label="Кнопки"
  //             portStatus={node.getPort('button').options.isConnected}
  //           />
  //         </div>
  //         {/*        <div className="TextNode__contentPorts__right">
  //         <TextPort
  //           port={node.getPort('outgoingMsg')}
  //           node={node}
  //           engine={engine}
  //           name="outgoingMsg"
  //           align="right"
  //           color="#7FFF6A"
  //           label="Сообщение"
  //           portStatus={portStatus[node.getPort('outgoingMsg').options.id]}
  //         />
  //       </div> */}
  //       </div>
  //     </div>
  //   );
  // }, [node.isSelected()]);
  const [context, setContext] = useContext(DetailsContext);

  return (
    <div
      className={classNames('TextNode', { 'TextNode--selected': node.isSelected() })}
      onClick={() => {
        const updatedContext = context || [];

        updatedContext.push(node);
        setContext(updatedContext);
      }}
    >
      <div className="TextNode__header">
        <div className="TextNode__type" />
        <div className="TextNode__title">{node.options.data.title || 'IncomingTextNode'}</div>
      </div>
      <div className="TextNode__flowPorts">
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
      <div className="TextNode__contentPorts">
        <div className="TextNode__contentPorts__left">
          {/*          <TextPort
            port={node.getPort('incomingMsg')}
            node={node}
            engine={engine}
            name="incomingMsg"
            align="left"
            color="#7FFF6A"
            label="Сообщение"
            portStatus={portStatus[node.getPort('incomingMsg').options.id]}
          /> */}
          <TextPort
            port={node.getPort('comparisonText')}
            node={node}
            engine={engine}
            name="comparisonText"
            align="left"
            color="#EDEDED"
            label="Текст для сравнения"
            portStatus={node.getPort('comparisonText').options.isConnected}
          />
          <TextPort
            port={node.getPort('button')}
            node={node}
            engine={engine}
            name="button"
            align="left"
            color="#EDEDED"
            label="Кнопки"
            portStatus={node.getPort('button').options.isConnected}
          />
        </div>
        {/*        <div className="TextNode__contentPorts__right">
          <TextPort
            port={node.getPort('outgoingMsg')}
            node={node}
            engine={engine}
            name="outgoingMsg"
            align="right"
            color="#7FFF6A"
            label="Сообщение"
            portStatus={portStatus[node.getPort('outgoingMsg').options.id]}
          />
        </div> */}
      </div>
    </div>
  );
};

TextNodeWidget.propTypes = {
  node: PropTypes.instanceOf(IncomingTextNodeModel),
  engine: PropTypes.instanceOf(DiagramEngine)
};

TextNodeWidget.defaultProps = {
  node: null,
  engine: null
};

export default TextNodeWidget;
