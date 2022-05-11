import React, {
  useState, useEffect, useMemo, useContext
} from 'react';
import PropTypes from 'prop-types';
import './rightPanel.less';
import { NodeModel } from '@projectstorm/react-diagrams';
import DetailsContext from '../../Contexts/DetailsContext';
import DiagramEngine from '../../DiagramEngine';
import NodeDetails from './NodeDetails/NodeDetails';
import { VariableNodeModel } from '../../Custom/Variables/Models';
import VariableNodeDetails from './VariableNodeDetails/VariableNodeDetails';

const RightPanel = props => {
  const {
    engine
  } = props;
  const [context, setContext] = useContext(DetailsContext);

  const selectedDetails = () => {
    if (!context || context?.length > 1 || context?.length === 0) {
      return <div />;
    }

    if (context[0] instanceof VariableNodeModel) {
      return <VariableNodeDetails node={context[0]} engine={engine} />;
    }

    if (context[0] instanceof NodeModel) {
      return <NodeDetails node={context[0]} />;
    }

    return <div>{JSON.stringify(context.map(node => node.getID()))}</div>;
  };

  return (
    <div className="rightPanel">
      {selectedDetails()}
    </div>
  );
};

RightPanel.propTypes = {
  engine: PropTypes.instanceOf(DiagramEngine)
};
RightPanel.defaultProps = {
  engine: null
};
export default RightPanel;
