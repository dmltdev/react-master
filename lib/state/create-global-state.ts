"use client";

import { useEffect, useState } from "react";

type Subscriber<T> = (value: T) => void;

/**
 * A simple shared store following the subscription pattern.
 *
 * - All components access the same global state via closure
 * - Subscribers ensure reactivity across components
 * - Works with any type: numbers, strings, objects, arrays, even complex data
 *
 * @example
 * // Create a global counter hook
 * export const useGlobalCounter = createGlobalState(0);
 *
 * // In a component
 * const [count, setCount] = useGlobalCounter();
 * setCount(count + 1);
 *
 * @author Anmol Kasal 
 * @see https://www.linkedin.com/in/kansalanmol0609/
 */
function createGlobalState<T>(initialValue: T) {
  let state = initialValue;
  const subscribers = new Set<Subscriber<T>>();

  const setState = (newValue: T) => {
    state = newValue;
    subscribers.forEach((callback) => callback(state));
  };

  const useGlobalState = () => {
    const [localState, setLocalState] = useState(state);

    useEffect(() => {
      const callback = (newValue: T) => setLocalState(newValue);
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    }, []);

    return [localState, setState] as const;
  };

  return useGlobalState;
}

export { createGlobalState };
