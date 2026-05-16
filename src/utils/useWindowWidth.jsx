import { useState, useEffect } from "react";

export function useWindowWidth(delay = 200) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeout;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setWidth(window.innerWidth);
      }, delay);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [delay]);

  return width;
}