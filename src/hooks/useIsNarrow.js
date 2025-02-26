// src/hooks/useIsNarrow.js
import { useState, useEffect } from "react";

export default function useIsNarrow(breakpoint = 480) {
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isNarrow;
}
