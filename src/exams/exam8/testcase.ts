export default [
  `assert.deepEqual(times(2, String), [ '0', '1' ])`,

  `assert.deepEqual(times(3, Boolean), [ false, true, true ])`,

  `assert.deepEqual(times(5, function() {
  return 'Hi';
}), [ 'Hi', 'Hi', 'Hi', 'Hi', 'Hi' ])`,

  `assert.deepEqual(times(3, function(i) {
  return 'Hi-' + i;
}), [ 'Hi-0', 'Hi-1', 'Hi-2' ])`,
]
