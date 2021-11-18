export default [
  `const src = [1, [2, [3, 4]], 5]
const target = [1, 2, 3, 4, 5]

assert.deepEqual(flatten(src), target)`,

  `const src = [1, [{name: 'BeiJing'}, [3, 'ZhongGuo'], {age: 90, isMale: false}], 6]
const target = [1, {name: 'BeiJing'}, 3, 'ZhongGuo', {age: 90, isMale: false}, 6]

assert.deepEqual(flatten(src), target)`,
]
