(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{mA18:function(n,p,e){"use strict";Object.defineProperty(p,"__esModule",{value:!0}),p.default=void 0;var o=["const app = new DI()\n\napp.register('duck', {\n  fly() {\n    return 'hello flying'\n  }\n});\n\napp.run(['duck', function(duck) {\n  assert.equal(duck.fly(), 'hello flying', '\u5b57\u9762\u91cf\u6ce8\u5165\u6d4b\u8bd5\u5931\u8d25')\n  done()\n}])","const app = new DI();\n\napp.register('woman', function() {\n    this.cry = function() {\n        return 'crying wawawa!'\n    }\n})\n\napp.run(['woman', function(woman) {\n    assert.equal(woman.cry(), 'crying wawawa!', '\u7c7b\u6ce8\u5165\u6d4b\u8bd5\u5931\u8d25')\n    done()\n}])","const app = new DI();\n\napp.register('people', function() {\n  this.yell = function() {\n      return 'don\\'t go'\n  }\n})\n\napp.register('puppy', function() {\n  this.bark = function() {\n      return 'wow'\n  }\n})\n\napp.run(['puppy', 'people', function(puppy, people) {\n  assert.equal(puppy.bark(), 'wow', '\u591a\u5b9e\u4f8bpuppy\u6ce8\u5165\u6d4b\u8bd5\u5931\u8d25')\n  assert.equal(people.yell(), 'don\\'t go', '\u591a\u5b9e\u4f8bpeople\u6ce8\u5165\u6d4b\u8bd5\u5931\u8d25')\n  done()\n}])","const app = new DI();\n\napp.register('puppy', function() {\n  this.bark = function() {\n    return 'wow'\n  }\n})\n\nassert.throws(function() {\n  app.run(['man', function(man) {}])\n}, Error, '\u4e0d\u5b58\u5728\u5b9e\u4f8b\u6d4b\u8bd5\u5931\u8d25')"];p.default=o}}]);