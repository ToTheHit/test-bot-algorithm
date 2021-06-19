import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './fadeIn.less';
import classNames from '../../../lib/classNames';

const FadeIn = (props) => {
  const { children, time } = props;
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, time);
  }, []);
  return (
    <div className={classNames('FadeIn', { 'FadeIn-hidden': hidden })} style={{ animationDuration: `${time}ms` }}>
      {children}
    </div>
  );
};

FadeIn.propTypes = {
  // fadeIn: PropTypes.bool,
  // fadeOut: PropTypes.bool,
  time: PropTypes.number,
  children: PropTypes.element,
};

FadeIn.defaultProps = {
  // fadeIn: true,
  // fadeOut: true,
  time: 500,
  children: null,
};

export default FadeIn;
