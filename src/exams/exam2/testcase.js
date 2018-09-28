export default [
  `
const add = currying(function(a, b) {
  return a + b;
})
assert.equal(add(1)(2), 3, '一次柯里化验证失败')
`
]
