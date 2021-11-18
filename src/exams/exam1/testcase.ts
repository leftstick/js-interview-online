export default [
  `assert(isString('hello'))`,
  `assert.equal(isString(12445), false)`,
  `assert.equal(isString(undefined), false)`,
  `assert.equal(isString(null), false)`,
  `assert(isString(new String('hello')))`,
  `assert.equal(isString({ name: 'aaa' }), false)`,
]
