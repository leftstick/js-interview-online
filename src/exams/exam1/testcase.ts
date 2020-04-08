export default [
  `assert(isString('hello'), '原始string类型校验失败')`,
  `assert.equal(isString(12445), false, '原始数值类型校验失败')`,
  `assert.equal(isString(undefined), false, '未初始化变量校验失败')`,
  `assert.equal(isString(null), false, '空值校验失败')`,
  `assert(isString(new String('hello')), '字符串对象校验失败')`,
  `assert.equal(isString({ name: 'aaa' }), false, '字面量类型校验失败')`
]
