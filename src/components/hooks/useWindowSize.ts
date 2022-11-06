// from https://usehooks.com/useWindowSize/

import { useState, useEffect } from "react";
import debounceFn from "debounce-fn";

const isClient = typeof window === "object";

function getSize() {
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    const debouncedHandleResize = debounceFn(handleResize, { wait: 100 });

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return windowSize;
}
