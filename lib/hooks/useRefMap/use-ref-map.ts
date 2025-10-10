import { useRef, RefCallback } from "react";

/**
 * A map of refs indexed by string keys
 * @template T The type of elements being referenced
 */
type RefMap<T> = {
  current: Record<string, T | null>;
};

/**
 * A hook for managing multiple refs using a key-based approach
 * 
 * @template T The type of elements being referenced (e.g., HTMLDivElement, HTMLInputElement)
 * @returns A tuple containing:
 *   - refs: A RefMap object with all current references
 *   - setRef: A function that creates ref callbacks for specific keys
 * 
 * @example
 * ```tsx
 * const [inputRefs, setInputRef] = useRefMap<HTMLInputElement>();
 * 
 * // Later in JSX:
 * <input ref={setInputRef('email')} />
 * <input ref={setInputRef('password')} />
 * 
 * // Access elements:
 * const focusEmail = () => inputRefs.current['email']?.focus();
 * ```
 */
export function useRefMap<T>(): [RefMap<T>, (key: string) => RefCallback<T>] {
  const refs = useRef<Record<string, T | null>>({});

  /**
   * Creates a ref callback for a specific key
   * 
   * @param key The unique identifier for this ref
   * @returns A RefCallback function to be used with React's ref attribute
   */
  const setRef =
    (key: string): RefCallback<T> =>
    (el) => {
      refs.current[key] = el;
    };

  return [refs, setRef];
}
