const { listFilesMatchPattern } = require('./fast-glob.js')
const { cosmiconfig } = require('cosmiconfig')

async function check(args) {
  const { pattern, configFilePath } = args
  let files = await listFilesMatchPattern(pattern)
  console.log('Files that match pattern:')
  console.log(files)

  const explorer = cosmiconfig('bv')
  if (configFilePath === undefined) {
    console.log(
      'config option not specified, searching for default file path bv.config.js, .bvrc.json, etc.'
    )
    explorer
      .search()
      .then((result) => {
        console.log('Config:')
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    explorer
      .load(configFilePath)
      .then((result) => {
        if (result == null) {
          console.log('config file not found')
        } else {
          console.log(result)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

module.exports = {
  check
}
