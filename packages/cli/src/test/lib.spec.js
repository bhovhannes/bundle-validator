const { describe, it, expect } = require('@jest/globals')
const lib = require('../lib.js')

describe(`lib`, function () {
  it('exports `check` method', () => {
    expect(lib.check).toBe(expect.any(Function))
  })
})
