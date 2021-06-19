import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';
import './block_1.less';
import background from '../../../assets/Bicycle/block-1/background.jpg';
import logo from '../../../assets/Bicycle/block-1/Logo.png';

const Block_1 = forwardRef((props, ref) => {
  const { setScrollTo } = props;
  return (
    <header
      className="Bicycle-b1"
      ref={ref}
    >
      <div
        className="parallax"
        style={{ backgroundImage: `url(${background})` }}
      />

      <div className="Bicycle-b1__menu">
        <div className="Bicycle-b1__menu-left">
          <button
            type="button"
            className="Bicycle-b1__menu-left--item"
            onClick={() => setScrollTo(1)}
          >
            about us
          </button>
          <div className="Bicycle-b1__menu-left--item point" />
          <button
            type="button"
            className="Bicycle-b1__menu-left--item"
            onClick={() => setScrollTo(2)}
          >
            work
          </button>
        </div>
        <div className="Bicycle-b1__menu-middle" style={{ backgroundImage: `url(${logo})` }} />
        <div className="Bicycle-b1__menu-right">
          <button
            type="button"
            className="Bicycle-b1__menu-right--item"
            onClick={() => setScrollTo(3)}
          >
            shop
          </button>
          <div className="Bicycle-b1__menu-right--item point" />
          <button
            type="button"
            className="Bicycle-b1__menu-right--item"
            onClick={() => setScrollTo(4)}
          >
            contact
          </button>
        </div>
      </div>
      <button
        type="button"
        className="Bicycle-b1__arrow"
        onClick={() => {
          setScrollTo(1);
        }}
      />
    </header>
  );
});

Block_1.propTypes = {
  setScrollTo: PropTypes.func.isRequired,
};

export default Block_1;
