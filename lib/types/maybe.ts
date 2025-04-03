export type None = { readonly _tag: "None" };
export type Some<T> = { readonly _tag: "Some"; readonly value: T };
export type Maybe<T> = None | Some<T>;
