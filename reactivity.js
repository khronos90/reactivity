class Dependency {
  constructor() {
    this.subs = [];
  }
  depend(target) {
    if (target && !this.subs.includes(target)) {
      this.subs.push(target);
    }
  }
  notify() {
    this.subs.forEach((s) => s());
  }
}

const Dep = new Dependency();

module.exports = {
  reactive: (val) => {
    return new Proxy(
      { value: val },
      {
        get: (target, prop, receiver) => {
          return target[prop];
        },
        set: (obj, prop, newval) => {
          obj[prop] = newval;
          Dep.notify();
        },
      }
    );
  },
  watch: (cb) => {
    Dep.depend(cb);
    cb();
  },
};
