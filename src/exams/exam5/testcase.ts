export default [
  `assert.equal(value(2), 2, '简单数值验证失败')`,
  `const fn = function() {
  return 3
}
assert.equal(value(fn), 3, '简单方法验证失败')`,
  `const fn = function() {
  return function() {
      return 'Hello';
  };
};
assert.equal(value(fn), 'Hello', '嵌套方法验证失败')`,
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
assert.deepEqual(value(fn), [1, 2], '多层嵌套验证失败')`
]
