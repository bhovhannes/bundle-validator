const { sizeof } = require('file-sizeof')

const re = new RegExp('\\d+[kmgtp]?b', 'i')
const numRegex = /\d+/
const byteRegex = /[kbmgtp]?b/i

function run(executionContext, pluginOptions) {
  executionContext.log(
    'debug',
    `Executing plugin '@bundle-validator/plugin-bundle-size' for file '${executionContext.filePath}'`
  )
  executionContext.log('debug', pluginOptions)
  const iec = sizeof.IEC(executionContext.filePath)
  if ('maxSize' in pluginOptions) {
    let maxSizeOption = pluginOptions.maxSize
    if (re.test(maxSizeOption)) {
      let size_threshold = maxSizeOption.match(numRegex)
      let unit = maxSizeOption.match(byteRegex)
      executionContext.log('debug', `File size ${iec[unit]}${unit}`)
      if (iec[unit] <= size_threshold) {
        var testStatus = 'pass'
      } else {
        var testStatus = 'fail'
      }
      var testMessage =
        'File size ' +
        iec[unit] +
        unit +
        ' is ' +
        (testStatus == 'pass' ? 'less than or equal to' : 'greater than') +
        ' max size ' +
        maxSizeOption
    } else {
      var testMessage =
        'Plugin option maxSize in wrong format: number + unit (B, KB, MB, GB, TB, PB)'
      var testStatus = 'fail'
    }
  } else {
    var testMessage = 'Missing maxSize key in plugin options'
    var testStatus = 'fail'
  }

  return {
    message: testMessage,
    status: testStatus
  }
}

function title(pluginOptions) {
  return `File size should be less than ${pluginOptions.maxSize}`
}

module.exports = {
  run,
  title
}
