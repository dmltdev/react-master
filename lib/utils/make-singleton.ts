function makeSingleton<T extends object>(fn: new () => T) {
  let instance: T | undefined;
  return new Proxy(fn, {
    construct: function (target, args) {
      if (!instance) {
        instance = new fn();
      }
      return instance;
    },
  });
}

export { makeSingleton };
