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
        join(packageRootDirectory, 'test', 'fixtures', 'valid', '.bvrc.json'),
        '--config',
        join(packageRootDirectory, 'test', 'fixtures', 'valid', '.bvrc.json')
      ])
      expect(result.stdout).not.toMatch(/E\d\d\d/)
      expect(result.exitCode).toEqual(0)
    })

    it('outputs a valid TAP report', async () => {
      const result = await runCli([
        'check',
        join(packageRootDirectory, 'test', 'fixtures', 'tap-report', '*.js'),
        '--config',
        join(packageRootDirectory, 'test', 'fixtures', 'tap-report', '.bvrc.json')
      ])
      expect(result.stdout).toContain('# tests 3')
      expect(result.stdout).toContain('# pass 2')
      expect(result.stdout).toContain('# fail 1')
      expect(result.stdout).toContain('1..3')
      expect(result.stdout).toContain('"i-am-a-long-file.js" contains more than 8 characters')
      expect(result.exitCode).not.toEqual(0)
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

    it('exits with code 0 on success after running plugin-bundle-size', async () => {
      const result = await runCli([
        'check',
        join(packageRootDirectory, 'test', 'fixtures', 'sample-size-files', 'test'),
        '--config',
        join(packageRootDirectory, 'test', 'fixtures', 'valid', '.bundleSizePass.json')
      ])
      expect(result.exitCode).toEqual(0)
    })

    it('exits with code 1 on fail after running plugin-bundle-size', async () => {
      const result = await runCli([
        'check',
        join(packageRootDirectory, 'test', 'fixtures', 'sample-size-files', 'test'),
        '--config',
        join(packageRootDirectory, 'test', 'fixtures', 'valid', '.bundleSizeFail.json')
      ])
      expect(result.exitCode).toEqual(1)
    })

    it('exits with code 0 on success after running plugin-bundle-size, maxSize option expressed as a number', async () => {
      const result = await runCli([
        'check',
        join(packageRootDirectory, 'test', 'fixtures', 'sample-size-files', 'test'),
        '--config',
        join(packageRootDirectory, 'test', 'fixtures', 'valid', '.bundleSizeNum.json')
      ])
      expect(result.exitCode).toEqual(0)
    })
  })
})
