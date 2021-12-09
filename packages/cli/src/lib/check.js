const { listFilesMatchPattern } = require('./fast-glob.js')
const { cosmiconfig } = require('cosmiconfig')
const { logger } = require('./logger.js')

async function check(args) {
  const { pattern, configFilePath } = args
  let files = await listFilesMatchPattern(pattern)
  logger.debug('List of files that match pattern:\n' + files.join('\r\n'))

  const explorer = cosmiconfig('bv')
  if (configFilePath === undefined) {
    logger.info(
      'config option not specified, searching for default file path bv.config.js, .bvrc.json, etc.'
    )

    try {
      const result = await explorer.search()
      if (result == null) {
        logger.error('Default config file not found')
        process.exit(0)
      } else {
        logger.debug('Config file found!')
        logger.debug(result)
      }
    } catch (err) {
      logger.error(err)
    }
  } else {
    explorer
      .load(configFilePath)
      .then((result) => {
        logger.debug('Config file found!')
        logger.debug(result)
      })
      .catch((error) => {
        logger.error('Failed to load config file ' + configFilePath)
        logger.error(error)
      })
  }
}

module.exports = {
  check
}
