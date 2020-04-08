export default [
  `assert.deepEqual(times(2, String), [ '0', '1' ], '基本测试失败')`,

  `assert.deepEqual(times(3, Boolean), [ false, true, true ], 'Boolean值测试测试失败')`,

  `assert.deepEqual(times(5, function() {
  return 'Hi';
}), [ 'Hi', 'Hi', 'Hi', 'Hi', 'Hi' ], '不使用index测试失败')`,

  `assert.deepEqual(times(3, function(i) {
  return 'Hi-' + i;
}), [ 'Hi-0', 'Hi-1', 'Hi-2' ], '使用index测试失败')`
]
