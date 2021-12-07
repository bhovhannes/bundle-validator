const { listFilesMatchPattern } = require('./fast-glob.js')

async function check(args) {
  const { pattern, traces } = args
  let files = await listFilesMatchPattern(pattern)
  console.log(files)
}

module.exports = {
  check
}
