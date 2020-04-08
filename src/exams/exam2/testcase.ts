export default [
  `const add = currying(function(a, b) {
  return a + b;
})
assert.equal(add(1)(2), 3, '一次柯里化验证失败')
`,
  `const add = currying(function(a, b, c) {
  return a + b + c;
})
assert.equal(add(1, 2)(3), 6, '多参数一次柯里化验证失败')
`,
  `const add = currying(function(a, b, c) {
  return a + b + c;
})
assert.equal(add(1)(2)(3), 6, '多参数多次柯里化验证失败')
`,
  `const add = currying(function(a, b, c) {
  return a + b + c;
})
assert.equal(add(1)(2)(3), 6, '多参数多次柯里化验证失败');
assert.equal(add(2)(3)(4), 9, '多参数多次柯里化状态分离验证失败')`,
  `const add = currying(function(a, b, c, d) {
  return a + b + c + d;
})
const a11 = add(1)
assert.equal(a11(2)(3)(4), 10, '多参数多次柯里化验证失败')
assert.equal(a11(2, 3, 4), 10, '多参数多次柯里化复用验证失败')`
]
