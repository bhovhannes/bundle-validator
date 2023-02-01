const { join } = require('node:path')
const { describe, it, expect } = require('@jest/globals')
const pkgDir = require('pkg-dir')
const plugin = require('../src/index.js')

const packageRootDirectory = pkgDir.sync(__dirname)

describe(`plugin`, function () {
  function getExecutionContent(fixtureFileName) {
    return {
      filePath: join(packageRootDirectory, 'test', 'fixtures', fixtureFileName),
      log: () => {}
    }
  }

  it(`fails when 'externals' option is empty`, () => {
    const result = plugin.run(getExecutionContent('without-lodash.js'), {
      externals: []
    })
    expect(result).toEqual({
      message: `The 'externals' option cannot be empty`,
      status: 'fail'
    })
  })

  it(`fails when 'externals' option is missing`, () => {
    const result = plugin.run(getExecutionContent('without-lodash.js'), {})
    expect(result).toEqual({
      message: `Missing 'externals' key in plugin options. Pass an array.`,
      status: 'fail'
    })
  })

  it(`passes when 'lodash' is not bundled and included in 'externals' option`, () => {
    const result = plugin.run(getExecutionContent('without-lodash.js'), {
      externals: ['lodash']
    })
    expect(result).toEqual({
      message: '',
      status: 'pass'
    })
  })

  it(`fails when 'lodash' is bundled and included in 'externals' option`, () => {
    const result = plugin.run(getExecutionContent('with-lodash.js'), {
      externals: ['lodash']
    })
    expect(result).toEqual({
      message: expect.any(String),
      status: 'fail'
    })
  })
})
