const { listFilesMatchPattern } = require('./fast-glob.js')

async function check(args) {
  const { pattern } = args
  let files = await listFilesMatchPattern(pattern)
  console.log('Files that match pattern:')
  console.log(files)
}

module.exports = {
  check
}
