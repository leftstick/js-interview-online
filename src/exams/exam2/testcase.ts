export default [
  `const add = currying(function(a, b) {
  return a + b;
})
assert.equal(add(1)(2), 3)
`,
  `const add = currying(function(a, b, c) {
  return a + b + c;
})
assert.equal(add(1, 2)(3), 6)
`,
  `const add = currying(function(a, b, c) {
  return a + b + c;
})
assert.equal(add(1)(2)(3), 6)
`,
  `const add = currying(function(a, b, c) {
  return a + b + c;
})
assert.equal(add(1)(2)(3), 6);
assert.equal(add(2)(3)(4), 9)`,
  `const add = currying(function(a, b, c, d) {
  return a + b + c + d;
})
const a11 = add(1)
assert.equal(a11(2)(3)(4), 10)
assert.equal(a11(2, 3, 4), 10)`,
]
