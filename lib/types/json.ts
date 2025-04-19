/**
 * A recursive type representing valid JSON values.
 *
 * Supports:
 * - Primitives: string, number, boolean, null
 * - Objects with string keys and JSON-compatible values (including `undefined`)
 * - Arrays of JSON values
 *
 * Note: This type allows `undefined` in objects to support optional properties,
 * although `undefined` is not valid in strict JSON serialization.
 */
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];
