import { useEffect, useState } from "react";

const useResponsivePadding = () => {
  const [padding, setPadding] = useState(24); // default desktop

  useEffect(() => {
    const updatePadding = () => {
      const width = window.innerWidth;
      setPadding(width < 768 ? 8 : 24); // mobile vs desktop
    };

    updatePadding(); // initial check
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  return padding;
};

export default useResponsivePadding;
