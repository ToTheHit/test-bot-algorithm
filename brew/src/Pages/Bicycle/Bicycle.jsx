import React, { useEffect, useRef, useState } from 'react';
import classNames from '../../lib/classNames';

import './bicycle.less';

import Block_1 from '../../components/Bicycle/block-1/Block_1';

const Bicycle = () => {

  return (
    <div className={classNames('Bicycle', 'wrapper')}>
      <Block_1
        setScrollTo={() => {}}
      />
    </div>
  );
};

Bicycle.propTypes = {};

export default Bicycle;
