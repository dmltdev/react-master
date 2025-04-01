import { describe, it, expect } from "vitest";
import { deepFreeze } from "../lib/utils/deep-freeze";

/* eslint-disable */

describe("deepFreeze", () => {
  it("should freeze a simple object", () => {
    const obj = { a: 1, b: 2 };
    deepFreeze(obj);

    expect(Object.isFrozen(obj)).toBe(true);

    expect(() => {
      obj.a = 3;
    }).toThrow(TypeError);
  });

  it("should deeply freeze nested objects", () => {
    const obj = {
      a: 1,
      b: {
        c: 3,
        d: { e: 4 },
      },
    };

    deepFreeze(obj);

    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.b)).toBe(true);
    expect(Object.isFrozen(obj.b.d)).toBe(true);

    expect(() => {
      obj.a = 2;
    }).toThrow(TypeError);
    expect(() => {
      obj.b.c = 5;
    }).toThrow(TypeError);
    expect(() => {
      obj.b.d.e = 6;
    }).toThrow(TypeError);
  });

  it("should freeze arrays and their contents", () => {
    const obj: any = {
      array: [1, 2, { nestedProp: "value" }],
    };

    deepFreeze(obj);

    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.array)).toBe(true);
    expect(Object.isFrozen(obj.array[2])).toBe(true);

    expect(() => {
      obj.array.push(3);
    }).toThrow(TypeError);
    expect(() => {
      obj.array[0] = 99;
    }).toThrow(TypeError);
    expect(() => {
      obj.array[2].nestedProp = "modified";
    }).toThrow(TypeError);
  });

  it("should freeze functions and their properties", () => {
    const func = function () {
      return "test";
    };
    func.prop = "property";
    func.nestedObj = { key: "value" };

    deepFreeze(func);

    expect(Object.isFrozen(func)).toBe(true);
    expect(Object.isFrozen(func.nestedObj)).toBe(true);

    expect(() => {
      func.prop = "modified";
    }).toThrow(TypeError);
    expect(() => {
      func.nestedObj.key = "modified";
    }).toThrow(TypeError);
  });

  it("should handle circular references without infinite recursion", () => {
    const obj: any = { a: 1 };
    obj.self = obj;
    obj.nested = { parent: obj };

    expect(() => deepFreeze(obj)).not.toThrow();

    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.nested)).toBe(true);

    expect(() => {
      obj.a = 2;
    }).toThrow(TypeError);
    expect(() => {
      obj.nested.parent = null;
    }).toThrow(TypeError);
  });

  it("should handle non-enumerable properties", () => {
    const obj = { a: 1 };
    Object.defineProperty(obj, "hidden", {
      value: { secret: "value" },
      enumerable: false,
    });

    deepFreeze(obj);

    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj["hidden"])).toBe(true);

    // Verify non-enumerable property modifications are prevented
    expect(() => {
      obj["hidden"].secret = "modified";
    }).toThrow(TypeError);
  });

  it("should handle null properties", () => {
    const obj: { a: any; b: any } = {
      a: null,
      b: { c: null },
    };

    deepFreeze(obj);

    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.b)).toBe(true);

    // Verify modifications are prevented
    expect(() => {
      obj.a = {};
    }).toThrow(TypeError);
    expect(() => {
      obj.b.c = {};
    }).toThrow(TypeError);
  });

  it("should handle objects with prototype modifications", () => {
    const obj = Object.create({});
    obj.hasOwnProperty = () => false;
    obj.a = { b: 2 };

    deepFreeze(obj);

    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.a)).toBe(true);

    expect(() => {
      obj.a.b = 3;
    }).toThrow(TypeError);
  });
});

/* eslint-enable */
