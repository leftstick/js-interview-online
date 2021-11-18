export default [
  `
  const treeNode = {
    value: 10,
    left: {
      value: 8,
      left: {
        value: 15
      },
      right: {
        value: 7
      }
    },
    right: {
      value: 9
    }
  }
  assert.equal(maxDepth(treeNode), 3)`,
]
