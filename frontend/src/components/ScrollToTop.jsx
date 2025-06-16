// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Allow route transition animations (if any), then scroll smoothly
    const timeout = setTimeout(() => {
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        // Fallback for older browsers
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }, 100); // Delay slightly after route change (adjustable)

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
