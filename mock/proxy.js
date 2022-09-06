function sum(a, b) {
  return a + b;
}

const proxySum = new Proxy(sum, {
  apply: function (target, ctx, args) {
    console.log('intercept====>', target, ctx, args);

    return 123;
  }
});

const tar = {
  name: 'monkeu',
  _age: 12,
  getName() {
    return this.name;
  },
  setName(name) {
    this.name = name;
  },
  getAge() {
    return this._age;
  },
  get age() {
    return this._age;
  },
  set age(age) {
    this._age = age;
  }
};

const proxyTar = new Proxy(tar, {
  get: function (target, property) {
    if (target[property]) {
      return target[property];
    }
    return 'undefiend';
  }
});

console.log('origin===', tar.getName(), tar.age);
proxyTar.age = 18;
console.log('proxy===', proxyTar.getName(), proxyTar.age);
