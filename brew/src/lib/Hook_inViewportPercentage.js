import { useCallback, useEffect, useState } from 'react';

/**
 * @param ref - React.ref to element
 * @param topOffset - Offset in percent (0 - 100)
 * @param disableAfterFullDisplay
 * @param throttleDelay - Delay for scroll event listener in ms
 * @returns {number}
 */
export default (ref, topOffset = 0, disableAfterFullDisplay = true, throttleDelay = 50) => {
  const [percent, setPercent] = useState(0);

  Function.prototype.throttle = function (delay = 100, ignoreLast = false) {
    const func = this;
    let lastTime = 0;
    let timer;

    return function () {
      const self = this; const
        args = arguments;
      const exec = function () {
        lastTime = new Date();
        func.apply(self, args);
      };
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      const diff = new Date() - lastTime;
      if (diff > delay) {
        exec();
      } else if (!ignoreLast) {
        timer = setTimeout(exec, delay - diff);
      }
    };
  };

  function percentageSeen() {
    const viewportHeight = window.innerHeight;
    const elementHeight = -1 * ref.current.getBoundingClientRect().height + topOffset;

    let distance = Math.round(
      ((ref.current.getBoundingClientRect().y - viewportHeight) / (elementHeight)) * 100,
    );
    distance = Math.min(100, Math.max(0, distance));

    setPercent(distance);
  }

  // Используется useCallback для того, чтобы в дальнейшем применить removeEventListener.
  // Без useCallback ссылка на функцию percentageSeen сбивается при каждом
  // ререндере родительского компонента
  const onScroll = useCallback(percentageSeen.throttle(throttleDelay, false), []);

  useEffect(() => {
    if (disableAfterFullDisplay && percent === 100) {
      window.removeEventListener('scroll', onScroll);
    }
  }, [percent]);

  useEffect(() => {
    if (!ref.current) return console.error('Custom hook "inViewportPercentage": Ref not found');

    percentageSeen();
    window.addEventListener('scroll', onScroll);


    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref]);

  return percent;
};
