"use client";

import { useSyncExternalStore } from "react";

/**
 * A hook to subscribe to window size and return its width and height.
 *
 * @returns {Object} The current window dimensions
 * @returns {number} .width - The current window inner width in pixels
 * @returns {number} .height - The current window inner height in pixels
 *
 * @example
 * ```tsx
 *  function Layout() {
 *      const { width } = useWindowSize();
 *      return width < 768 ? <MobileLayout> : <DesktopLayout/>;
 *  }
 * ```
 */
function useWindowSize() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => ({ width: window.innerWidth, height: window.innerHeight })
  );
}

export { useWindowSize };
