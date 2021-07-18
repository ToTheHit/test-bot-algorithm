import React, { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';

const Output = observer(({ obj }) => {
  useEffect(() => {
    // console.log('>>> value', obj.value);
  }, [obj.value]);

  return <div style={{ color: 'white', width: '50px', height: '50px' }}>{obj.value}</div>;
});

export default Output;
