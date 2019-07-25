export default [
  `const app = new DI()

app.register('duck', {
  fly() {
    return 'hello flying'
  }
});

app.run(['duck', function(duck) {
  assert.equal(duck.fly(), 'hello flying', '字面量注入测试失败')
  done()
}])`,

  `const app = new DI();

app.register('woman', function() {
    this.cry = function() {
        return 'crying wawawa!'
    }
})

app.run(['woman', function(woman) {
    assert.equal(woman.cry(), 'crying wawawa!', '类注入测试失败')
    done()
}])`,

  `const app = new DI();

app.register('people', function() {
  this.yell = function() {
      return 'don\\'t go'
  }
})

app.register('puppy', function() {
  this.bark = function() {
      return 'wow'
  }
})

app.run(['puppy', 'people', function(puppy, people) {
  assert.equal(puppy.bark(), 'wow', '多实例puppy注入测试失败')
  assert.equal(people.yell(), 'don\\'t go', '多实例people注入测试失败')
  done()
}])`,

  `const app = new DI();

app.register('puppy', function() {
  this.bark = function() {
    return 'wow'
  }
})

assert.throws(function() {
  app.run(['man', function(man) {}])
}, Error, '不存在实例测试失败')`
]
