const Mocha = require('mocha')
const { bold } = require('kleur')
const { logger } = require('./logger.js')
const { LoggedError } = require('./LoggedError.js')
const { cannotLoadPlugin } = require('./errors.js')

const { createRequire } = require('node:module')

function loadPlugins(normalizedConfig, configFilePath) {
  return normalizedConfig.plugins.map(([pluginName, pluginOptions]) => {
    try {
      const require = createRequire(configFilePath)
      const plugin = require(pluginName)
      return {
        plugin,
        pluginName,
        options: pluginOptions
      }
    } catch (e) {
      throw new LoggedError(`${cannotLoadPlugin}\n${e}`)
    }
  })
}

function pluginLogger(level, ...args) {
  return logger[level](...args)
}

async function runPlugins(plugins, files, config) {
  const mocha = new Mocha({
    timeout: 200000,
    reporter: config.reporter || 'spec',
    reporterOptions: config.reporterOptions || {}
  })

  for (let { plugin, pluginName, options } of plugins) {
    const suite = new Mocha.Suite(plugin.title?.(options) || pluginName)
    suite.timeout(0)

    for (let file of files) {
      const executionContext = {
        filePath: file,
        log: pluginLogger
      }

      suite.addTest(
        new Mocha.Test(file, async function () {
          const result = await plugin.run(executionContext, options)
          if (result.status === 'pass') {
            return true
          }
          throw new Error(result.message)
        })
      )
    }

    mocha.suite.addSuite(suite)
  }

  await new Promise((resolve, reject) => {
    mocha.run((failures) => {
      if (failures) {
        logger.error(`${bold(failures)} failures found. Check the report.`)
        process.exitCode = 1
        resolve()
      }
      resolve()
    })
  })
}

module.exports = {
  loadPlugins,
  runPlugins
}
