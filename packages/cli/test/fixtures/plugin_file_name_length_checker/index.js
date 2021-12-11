const { basename } = require('path')

function run(executionContext, pluginOptions) {
  const fileName = basename(executionContext.filePath)
  if (fileName.length > pluginOptions.maxLength) {
    return {
      message: `"${fileName}" contains more than ${pluginOptions.maxLength} characters`,
      status: 'fail'
    }
  }
  return {
    message: '',
    status: 'pass'
  }
}

function title(pluginOptions) {
  return `File name length should be less than ${pluginOptions.maxLength}`
}

module.exports = {
  run,
  title
}
