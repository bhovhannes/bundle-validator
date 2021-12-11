const xbytes = require('xbytes')
const fs = require('fs')

function run(executionContext, pluginOptions) {
  let testStatus = 'fail'
  let testMessage = ''
  executionContext.log(
    'debug',
    `Executing plugin '@bundle-validator/plugin-bundle-size' for file '${executionContext.filePath}'`
  )
  executionContext.log('debug', pluginOptions)
  let fileSize = fs.statSync(executionContext.filePath).size
  if ('maxSize' in pluginOptions) {
    let maxSizeOption = pluginOptions.maxSize
    if (xbytes.isParsable(maxSizeOption)) {
      let parsedOption = xbytes.parseBytes(maxSizeOption)
      let maxSizeInBytes = parsedOption.bytes
      if (fileSize <= maxSizeInBytes) {
        testStatus = 'pass'
      }
      testMessage =
        'File size ' +
        xbytes(fileSize, { prefixIndex: parsedOption.prefixIndex }) +
        ' is ' +
        (testStatus == 'pass' ? 'less than or equal to' : 'greater than') +
        ' max size ' +
        xbytes(maxSizeInBytes, { prefixIndex: parsedOption.prefixIndex })
    } else {
      testMessage =
        'Plugin option maxSize in wrong format. Correct format is number (in bytes) or a string (see https://www.npmjs.com/package/xbytes#unitstring for supported units)'
    }
  } else {
    testMessage = 'Missing maxSize key in plugin options'
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
