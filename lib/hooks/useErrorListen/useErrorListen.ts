"use client";

import { useEffect, useRef } from "react";

type ErrorHandler = (error: Error | string, errorInfo?: any) => void;

const enum Event {
  error = "error",
  unhandledrejection = "unhandledrejection",
}

/**
 * Subscribes to global error events (`window.onerror` and `unhandledrejection`)
 * and forwards them to the provided error handler.
 *
 * Useful for centralized error tracking in React apps (e.g., logging, reporting).
 *
 * @param onError - Callback to handle the error. Receives either an `Error` object or a string message.
 *   - The second argument is optional and may contain error metadata (like filename, line, column).
 *
 * @example
 * useErrorListen((err, info) => {
 *   console.error("Global error caught:", err, info);
 *   reportError(err);
 * });
 */
function useErrorListen(onError: ErrorHandler) {
  const ref = useRef(onError);

  useEffect(() => {
    ref.current = onError;
  }, [onError]);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      ref.current(event.error || event.message, {
        source: event.filename,
        line: event.lineno,
        column: event.colno,
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      ref.current(event.reason || "Unhandled promise rejection");
    };

    window.addEventListener(Event.error, handleError);
    window.addEventListener(Event.unhandledrejection, handleRejection);

    return () => {
      window.removeEventListener(Event.error, handleError);
      window.removeEventListener(Event.unhandledrejection, handleRejection);
    };
  }, []);
}

export { useErrorListen };
