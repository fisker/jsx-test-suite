import assert from 'node:assert/strict'
import test from 'node:test'
import testCases from './index.js'

test('main', () => {
  assert.ok(Array.isArray(testCases) && testCases.length > 1)
  for (const testCase of testCases) {
    assert.equal(typeof testCase.name, 'string')
    assert.equal(typeof testCase.id, 'string')
    assert.equal(typeof testCase.input, 'string')
    assert.equal(typeof testCase.error, 'boolean')

    if (testCase.error) {
      assert.equal(testCase.error, true)
      assert.deepEqual(
        Object.keys(testCase).toSorted(),
        ['name', 'id', 'error', 'input', 'errorMessage'].toSorted(),
      )
    } else {
      assert.equal(testCase.error, false)
      assert.deepEqual(
        Object.keys(testCase).toSorted(),
        ['name', 'id', 'error', 'input'].toSorted(),
      )
    }
  }
})
