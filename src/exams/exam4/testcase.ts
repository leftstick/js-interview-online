export default [
  `const NativeMap = Array.prototype.map
  let calledNativeMap = false
Array.prototype.map = function() {
  calledNativeMap = true
  return NativeMap.apply(this, arguments)
}

map(['x'], function(x) {
  return x;
})
assert.equal(calledNativeMap, false, '不能使用原生的map方法')
`,
  `const test = [1, 2, 3]
const actual = map(test, function(i) {
    return i + 1
})
assert.deepEqual(actual, [2, 3, 4], '基本测试用例失败')`,
  `const test = [
  {
      city: 'Shanghai',
      population: 25000000
  },
  {
      city: 'Beijing',
      population: 30000000
  }
];
const actual = map(test, function(i) {
  return i.population / this
}, 10)
assert.deepEqual(actual, [2500000, 3000000], '上下文环境测试失败')`
]
