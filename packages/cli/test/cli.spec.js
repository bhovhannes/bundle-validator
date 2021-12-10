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
        '*.json',
        '--config',
        join(packageRootDirectory, 'test', 'fixtures', 'valid', '.bvrc.json')
      ])
      expect(result.stdout).not.toMatch(/E\d\d\d/)
      expect(result.exitCode).toEqual(0)
    })

    it('exits with non-zero exit code if config cannot be found', async () => {
      const result = await runCli(['check', '*.js'])
      expect(result.stderr).toMatch(/E003/)
      expect(result.exitCode).not.toEqual(0)
    })

    it('exits with non-zero exit code if config cannot be loaded', async () => {
      const result = await runCli([
        'check',
        '*.js',
        '--config',
        join(packageRootDirectory, 'test', 'fixtures', 'invalid-configs', 'no-existent-config.json')
      ])
      expect(result.stderr).toMatch(/E002/)
      expect(result.exitCode).not.toEqual(0)
    })

    it('exits with non-zero exit code if provided config does not match schema', async () => {
      const result = await runCli([
        'check',
        '*.js',
        '--config',
        join(packageRootDirectory, 'test', 'fixtures', 'invalid-configs', '.bvrc.json')
      ])
      expect(result.stderr).toMatch(/E001/)
      expect(result.exitCode).not.toEqual(0)
    })

    it('exits with non-zero exit code if some plugin cannot be loaded', async () => {
      const result = await runCli([
        'check',
        '*.js',
        '--config',
        join(
          packageRootDirectory,
          'test',
          'fixtures',
          'invalid-configs',
          'non-existent-plugin.bvrc.json'
        )
      ])
      expect(result.stderr).toMatch(/E004/)
      expect(result.exitCode).not.toEqual(0)
    })
  })
})
