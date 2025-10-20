"use client";

import React, { type ReactNode, type FunctionComponent } from "react";

interface ErrorBoundaryProps {
  /** The component tree wrapped by the error boundary */
  children: ReactNode;
  /** A fallback React component to render on error */
  fallback: FunctionComponent;
  /**
   * Optional callback invoked when an error is caught.
   * Useful for logging to services like Sentry, etc.
   *
   * @param error - The thrown error
   * @param errorInfo - Additional info such as component stack trace
   */
  onError?(error: Error, errorInfo: React.ErrorInfo): void;
}

/**
 * A React error boundary component.
 *
 * Catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * @example
 * <ErrorBoundary fallback={FallbackComponent} onError={logError}>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false } as const;

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    const { children, fallback: Fallback } = this.props;

    if (this.state.hasError) {
      return <Fallback />;
    }

    return children;
  }
}

export { ErrorBoundary };
