function run(executionContext, pluginOptions) {
  // TODO  Add plugin code
  executionContext.log(
    'debug',
    `Executing plugin '@bundle-validator/plugin-bundle-size' for file '${executionContext.filePath}'`
  )
  executionContext.log('debug', pluginOptions)

  return {
    message: '',
    status: 'pass'
  }
}

module.exports = {
  run
}
