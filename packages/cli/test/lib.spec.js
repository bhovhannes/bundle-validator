const { describe, it, expect } = require('@jest/globals')
const lib = require('../src/lib.js')

describe(`lib`, function () {
  it('exports `check` method', () => {
    expect(typeof lib.check).toBe('function')
  })
})
