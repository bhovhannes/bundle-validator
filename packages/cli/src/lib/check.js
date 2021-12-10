const { listFilesMatchPattern } = require('./fast-glob.js')
const { cosmiconfig } = require('cosmiconfig')
const Ajv = require('ajv').default
const { logger } = require('./logger.js')
const { LoggedError } = require('./LoggedError.js')
const {
  configSchemaInvalid,
  cannotLoadConfigFile,
  cannotFindConfigFile,
  cannotLoadPlugin
} = require('./errors.js')
const { runPlugins } = require('./runPlugins.js')

async function check(args) {
  const { pattern, configFilePath } = args
  var files = await listFilesMatchPattern(pattern)
  logger.debug('List of files that match pattern:\n' + files.join('\r\n'))

  const { config } = await loadConfig(configFilePath)
  logger.debug('Loaded config:', config)

  await validateConfig(config)
  normalizeConfig(config)
  logger.debug('Effective config:', config)

  await runPlugins(files, config)
}

async function loadConfig(configFilePath) {
  let result
  const explorer = cosmiconfig('bv')

  if (configFilePath === undefined) {
    logger.info(
      'Option -c, --config not specified, searching for default file path bv.config.js, .bvrc.json, etc.'
    )
    result = await explorer.search()
    if (result == null) {
      throw new LoggedError(cannotFindConfigFile)
    }
  } else {
    try {
      result = await explorer.load(configFilePath)
    } catch (e) {
      throw new LoggedError(`${cannotLoadConfigFile}\n${e}`)
    }
  }
  return result
}

const validateAgainstSchema = new Ajv({ messages: true }).compile(require('./config.schema.json'))
async function validateConfig(config) {
  if (!validateAgainstSchema(config)) {
    throw new LoggedError(
      `${configSchemaInvalid}\n  ${validateAgainstSchema.errors
        .map((err) => err.message)
        .join('\n  ')}`
    )
  }
}

function normalizeConfig(config) {
  const { plugins } = config
  for (let i = 0; i < plugins.length; ++i) {
    // convert 'plugin' to ['plugin', {}]
    if (typeof plugins[i] === 'string') {
      plugins[i] = [plugins[i], {}]
    }

    // convert ['plugin'] to ['plugin', {}]
    if (plugins[i].length < 2) {
      plugins[i].push({})
    }
  }
}

module.exports = {
  check
}
