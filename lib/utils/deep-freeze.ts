export function deepFreeze(o: object) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach((prop) => {
    if (
      Object.hasOwn(o, prop) &&
      o[prop] !== null &&
      (typeof o[prop] === "object" || typeof o[prop] === "function") &&
      !Object.isFrozen(o[prop])
    ) {
      deepFreeze(o[prop]);
    }
  });
}
