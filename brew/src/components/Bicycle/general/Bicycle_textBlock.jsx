import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './bicycle_textBlock.less';

const BicycleTextBlock = forwardRef((props, ref) => {
  const {
    icon, title, text, textStyle, className,
  } = props;
  return (
    <div className={`Bicycle-textBlock ${className}`} ref={ref}>
      <div
        className="Bicycle-textBlock__icon"
        style={{ backgroundImage: `url(${icon})` }}
      />
      <h2 className="Bicycle-textBlock__title">{title}</h2>
      <div className="Bicycle-textBlock__text" style={textStyle}>{text}</div>
      <div className="Bicycle-textBlock__line" />
    </div>
  );
});

BicycleTextBlock.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.shape({
    textAlign: PropTypes.string,
  }),
  className: PropTypes.string,
};

BicycleTextBlock.defaultProps = {
  textStyle: {
    textAlign: 'center',
  },
  className: '',
};

export default BicycleTextBlock;
