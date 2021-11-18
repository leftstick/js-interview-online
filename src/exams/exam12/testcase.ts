export default [
  `const src = ['1.0.6', '3.1.5', '3.1.2', '2.2.5', '1.9.9']
const target = '3.1.5'

assert.deepEqual(getLatestVersion(src), target)`,

  `const src = ['10.6.8', '3.1.5', '3.1.20', '2.220.1', '1.9.9']
  const target = '10.6.8'
  
  assert.deepEqual(getLatestVersion(src), target)`,

  `const src = ['2.1.4.5', '3.1.5', '3.1.20.6', '2.20', '1.9.9']
  const target = '3.1.20.6'
  
  assert.deepEqual(getLatestVersion(src), target)`,
]
