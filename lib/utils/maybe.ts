import type { None, Some, Maybe } from "../types";

// Constructors
export const none: None = { _tag: "None" };
export const some = <T>(value: T): Some<T> => ({ _tag: "Some", value });
export const maybe = <T>(value: T | null | undefined): Maybe<T> =>
  value === null || value === undefined ? none : some(value);

// Operators
export const map =
  <T, U>(f: (value: T) => U) =>
  (maybeT: Maybe<T>): Maybe<U> =>
    maybeT._tag === "None" ? none : some(f(maybeT.value));

export const flatMap =
  <T, U>(f: (value: T) => Maybe<U>) =>
  (maybeT: Maybe<T>): Maybe<U> =>
    maybeT._tag === "None" ? none : f(maybeT.value);

export const getOrElse =
  <T>(defaultValue: T) =>
  (maybeT: Maybe<T>): T =>
    maybeT._tag === "None" ? defaultValue : maybeT.value;

export const orElse =
  <T>(defaultMaybe: Maybe<T>) =>
  (maybeT: Maybe<T>): Maybe<T> =>
    maybeT._tag === "None" ? defaultMaybe : maybeT;

export const filter =
  <T>(predicate: (value: T) => boolean) =>
  (maybeT: Maybe<T>): Maybe<T> =>
    maybeT._tag === "None" ? none : predicate(maybeT.value) ? maybeT : none;

// Utility for composing operations
export const pipe = <A, B>(value: A, ...fns: Array<(input: any) => any>): B => {
  return fns.reduce((acc, fn) => fn(acc), value as any) as B;
};
