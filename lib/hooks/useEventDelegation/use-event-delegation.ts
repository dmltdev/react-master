"use client";

import { useEffect, useRef } from "react";

type EventName = keyof HTMLElementEventMap;

/**
 * Hook to handle delegated events on a container element.
 *
 * @param {string} selector - CSS selector for the target elements.
 * @param {(event: Event, target: Element) => void} handler - Handler for the event.
 * @param {EventName | string} [eventType='click'] - Type of event to listen for.
 * @returns {React.RefObject<HTMLElement>} Ref to attach to the container.
 */
function useEventDelegation<T extends HTMLElement = HTMLElement>(
  selector: string,
  handler: (event: Event, target: Element) => void,
  eventType: EventName | string = "click"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const listener = (event: Event) => {
      const target = (event.target as Element).closest(selector);
      if (target && container.contains(target)) {
        handler(event, target);
      }
    };

    container.addEventListener(eventType, listener);
    return () => container.removeEventListener(eventType, listener);
  }, [selector, handler, eventType]);

  return ref;
}

export default useEventDelegation;
