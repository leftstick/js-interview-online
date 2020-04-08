export default [
  `const src = ['nan', 'feng', 'hao']
const target = ['aa', 'xiao', 'hao']

assert.deepEqual(difference(src, target), ['nan', 'feng'], '基本测试失败')`,

  `const src = [1, NaN, 3]
const target = [NaN, 5, NaN]

assert.deepEqual(difference(src, target), [1, 3], 'NaN匹配测试失败')`,

  `const src = [1, NaN, 3];
const target = [5, 'k'];

assert.equal(difference(src, target).toString(), '1,NaN,3', 'NaN2匹配测试失败')`
]
