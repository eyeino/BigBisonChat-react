// from https://usehooks.com/useWindowSize/

import { useState, useEffect } from 'react';

const isClient = typeof window === 'object';

function getSize() {
  return {
    width: isClient ? window.visualViewport.width || window.innerWidth : undefined,
    height: isClient ? window.visualViewport.height || window.innerHeight : undefined
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}