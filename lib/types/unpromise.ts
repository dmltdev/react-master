/**
 * Unwraps a Promise type to its inner type.
 *
 * @template T - The type to unwrap.
 * @returns The inner type of the Promise.
 *
 * @example
 * ```typescript
 * type T = UnPromise<Promise<number>>;
 * // T = number
 * ```
 */
export type UnPromise<T> = T extends Promise<infer U> ? U : T;
