export default [
  `assert.equal(value(2), 2)`,
  `const fn = function() {
  return 3
}
assert.equal(value(fn), 3)`,
  `const fn = function() {
  return function() {
      return 'Hello';
  };
};
assert.equal(value(fn), 'Hello')`,
  `const fn = function() {
  return function() {
    return function() {
      return function() {
        return function() {
          return [1, 2];
        };
      };
    };
  };
};
assert.deepEqual(value(fn), [1, 2])`,
]
