import { useState, useEffect } from 'react';

export default (ref, threshold = 0.5, rootMargin = '0px 0px 0px 0px', disableAfterFirstDisplay = true) => {
  const [isVisible, setIsVisible] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
      if (entry.isIntersecting && disableAfterFirstDisplay) {
        observer.disconnect();
      }
    },
    {
      threshold,
      rootMargin,
    },
  );


  useEffect(() => {
    if (!ref.current) return console.error('Custom hook "inView": Ref not found');

    observer.observe(ref.current);
    // observer.root =  ref.current.parentNode;


    return () => {
      observer.unobserve(ref.current);
    };
  }, [ref]);

  return isVisible;
};
