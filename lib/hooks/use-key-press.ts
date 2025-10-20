"use client";

import { useEffect, useRef } from "react";

export type OnKeyPress = (e: KeyboardEvent) => void;

/**
 * React hook to listen for specific key presses and execute a callback when they occur.
 *
 * @param {string[]} keys - Array of key names to listen for (e.g., ['Enter', 'Escape', 'Space']).
 * @param {OnKeyPress} [onKeyPress] - Optional callback function to execute when one of the specified keys is pressed.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useKeyPress(['Enter', 'Space'], (event) => {
 *     console.log('Enter or Space was pressed!', event.key);
 *   });
 *
 *   useKeyPress(['Escape'], () => {
 *     // Close modal or perform cleanup
 *   });
 *
 *   return <div>Press Enter, Space, or Escape</div>;
 * }
 * ```
 */
export function useKeyPress(keys: string[], onKeyPress?: OnKeyPress) {
  const eventHandler = useRef<OnKeyPress | null>(null);

  useEffect(() => {
    // Only reflecte to callback is changed
    eventHandler.current = (event: KeyboardEvent) => {
      if (Array.isArray(keys) && keys.includes(event.key)) {
        onKeyPress?.(event);
      }
    };
  }, [keys, onKeyPress]);

  useEffect(() => {
    // Events attached/removed only once
    const handleKeyPress = (event: KeyboardEvent): void => {
      eventHandler.current?.(event);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
}
