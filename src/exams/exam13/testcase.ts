export default [
  `const src = ['1,张三,50','2,李四,80','3,王五,40','4,张三,90','5,王五,70']
const target = ['张三 = 70', '李四 = 80', '王五 = 55']

assert.deepEqual(getAverageScore(src), target)`,
]
