import React, {
  useState, useEffect, useMemo, useContext
} from 'react';
import PropTypes from 'prop-types';
import './rightPanel.less';
import { NodeModel } from '@projectstorm/react-diagrams';
import DetailsContext from '../../Contexts/DetailsContext';

const RightPanel = props => {
  const {
  } = props;
  const [context, setContext] = useContext(DetailsContext);

  const selected = () => {
    if (context?.length < 2) {
      return <div>{JSON.stringify(context.map(node => node.getID()))}</div>;
    }

    return <div />;
  };

  return (
    <div className="rightPanel">
      <div className="rightPanel__divider" />
      {selected()}
    </div>
  );
};

RightPanel.propTypes = {
};
RightPanel.defaultProps = {
};
export default RightPanel;
