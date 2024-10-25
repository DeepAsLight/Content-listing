import { useRef, useEffect } from 'react';

function useLazyLoad(callback, options) {
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      options
    );
  }, [callback, options]);

  return observer.current;
}

export default useLazyLoad;