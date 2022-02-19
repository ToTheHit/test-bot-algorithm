import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import './textNode.less';
import EditorStore from '../../../../../mobx/EditorStore';
import { FlowPort, TextPort } from '../../Ports/Components';
import classNames from '../../../../../lib/classNames';

const TextNodeWidget = props => {
  // eslint-disable-next-line react/prop-types
  const { node, engine } = props;
  const { portStatus } = EditorStore;

  const memoizedComponent = useMemo(() => {
    return (
      <div className={classNames('TextNode', { 'TextNode--selected': node.isSelected() })}>
        <div className="TextNode__header">
          <div className="TextNode__type" />
          <div className="TextNode__title">{node.title}</div>
        </div>
        <div className="TextNode__flowPorts">
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
              portStatus={portStatus[node.getPort('comparisonText').options.id]}
            />
            <TextPort
              port={node.getPort('button')}
              node={node}
              engine={engine}
              name="button"
              align="left"
              color="#EDEDED"
              label="Кнопки"
              portStatus={portStatus[node.getPort('button').options.id]}
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
    )
  }, [node.isSelected()]);

  return (
    <div className={classNames('TextNode', { 'TextNode--selected': node.isSelected() })}>
      <div className="TextNode__header">
        <div className="TextNode__type" />
        <div className="TextNode__title">{node.title}</div>
      </div>
      <div className="TextNode__flowPorts">
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
            portStatus={portStatus[node.getPort('comparisonText').options.id]}
          />
          <TextPort
            port={node.getPort('button')}
            node={node}
            engine={engine}
            name="button"
            align="left"
            color="#EDEDED"
            label="Кнопки"
            portStatus={portStatus[node.getPort('button').options.id]}
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
};

TextNodeWidget.defaultProps = {
  size: 50
};

export default TextNodeWidget;
