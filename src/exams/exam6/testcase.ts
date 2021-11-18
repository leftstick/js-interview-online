export default [
  `assert.equal(camelcase('helloworld'), 'helloworld')`,
  `assert.equal(camelcase('hello world'), 'helloWorld')`,
  `assert.equal(camelcase('HELLO WORLD'), 'helloWorld')`,
  `assert.equal(camelcase('how are you'), 'howAreYou')`,
  `assert.equal(camelcase('how   are   you'), 'howAreYou')`,
  `assert.equal(camelcase('what-is-this'), 'whatIsThis')`,
  `assert.equal(camelcase('i  will-miss this----exam'), 'iWillMissThisExam')`,
]
