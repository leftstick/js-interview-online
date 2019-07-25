export default [
  `assert.equal(camelcase('helloworld'), 'helloworld', '基本测试失败')`,
  `assert.equal(camelcase('hello world'), 'helloWorld', '单空格测试失败')`,
  `assert.equal(camelcase('HELLO WORLD'), 'helloWorld', '单空格全大写测试失败')`,
  `assert.equal(camelcase('how are you'), 'howAreYou', '单空格多单词测试失败')`,
  `assert.equal(camelcase('how   are   you'), 'howAreYou', '多空格测试失败')`,
  `assert.equal(camelcase('what-is-this'), 'whatIsThis', '横杠做分隔符测试失败')`,
  `assert.equal(camelcase('i  will-miss this----exam'), 'iWillMissThisExam', '混合测试失败')`
]
