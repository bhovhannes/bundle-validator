const fs = require('fs')
const { transformSync } = require('@swc/core')
const { Visitor } = require('@swc/core/Visitor')

const LODASH_TRACE = '__lodash_hash_undefined__'

function run(executionContext, pluginOptions) {
  executionContext.log(
    'debug',
    `Executing plugin '@bundle-validator/plugin-bundle-content' for file '${executionContext.filePath}'`
  )
  executionContext.log('debug', pluginOptions)

  if (!pluginOptions.externals || !Array.isArray(pluginOptions.externals)) {
    return {
      message: `Missing 'externals' key in plugin options. Pass an array.`,
      status: 'fail'
    }
  }

  if (pluginOptions.externals.length === 0) {
    return {
      message: `The 'externals' option cannot be empty`,
      status: 'fail'
    }
  }

  const fileContents = fs.readFileSync(executionContext.filePath, 'utf8')

  let lodashFound = false
  class AstNodeVisitor extends Visitor {
    visitStringLiteral(node) {
      if (node.value === LODASH_TRACE) {
        lodashFound = true
      }
      return node
    }
    visitAssignmentPatternProperty
  }

  transformSync(fileContents, {
    plugin: (m) => new AstNodeVisitor().visitProgram(m)
  })

  if (lodashFound) {
    return {
      message:
        'Detected traces of LoDash inside your bundle. Make sure it is properly externalized.',
      status: 'fail'
    }
  }
  return {
    message: '',
    status: 'pass'
  }
}

function title(pluginOptions) {
  return `File should not bundle ${pluginOptions.externals.join(', ')}`
}

module.exports = {
  run,
  title
}
