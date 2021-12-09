const fg = require('fast-glob')

async function listFilesMatchPattern(pattern) {
  const files = await fg(pattern)
  return files
}

module.exports = {
  listFilesMatchPattern
}
