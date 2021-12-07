const { describe, it, expect } = require('@jest/globals')
const { join } = require('path')
const pkgDir = require('pkg-dir')
const { execFile } = require('child_process')

const packageRootDirectory = pkgDir.sync(__dirname)

function runCli(argArray) {
  return new Promise((resolve) => {
    const child = execFile(
      'node',
      [join(packageRootDirectory, 'src', 'main.js'), ...argArray],
      (error, stdout, stderr) => {
        resolve({
          exitCode: child.exitCode,
          error,
          stdout,
          stderr
        })
      }
    )
  })
}

describe(`cli`, function () {
  describe(`check command`, () => {
    it('exits with code 0 on success (json format)', async () => {
      const result = await runCli([
        'check',
        join(packageRootDirectory, 'test', 'fixtures', 'valid', 'bundle.js')
      ])
      expect(result.stdout).not.toMatch(/E\d\d\d/)
      expect(result.exitCode).toEqual(0)
    })
  })
})
