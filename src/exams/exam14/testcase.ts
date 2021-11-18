export default [
  `const obj = { selector: { to: { coupang: "FE Coder"} }, target: [1, 2, { name: 'PangPang'}] }
const path = 'selector.to.coupang'
const target = 'FE Coder'

assert.equal(getByPath(obj, path), target)`,

  `const obj = { selector: { to: { coupang: "FE Coder"} }, target: [1, 2, { name: 'PangPang'}] }
const path = 'target[1]'
const target = 2

assert.equal(getByPath(obj, path), target)`,

  `const obj = { selector: { to: { coupang: "FE Coder"} }, target: [1, 2, { name: 'PangPang'}] }
const path = \`['selector']['to'].coupang\`
const target = 'FE Coder'

assert.equal(getByPath(obj, path), target)`,
]
