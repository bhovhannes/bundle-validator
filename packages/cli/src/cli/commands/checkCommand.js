const { Command } = require('commander')
const { check } = require('../../lib/check.js')

const checkCommand = new Command('check')
checkCommand.description('Checks given JS files for trace occurencies')
checkCommand.arguments('<pattern...>')
checkCommand.option(
  '-p, --plugin <names...>',
  'the names of the plugins that contain the checks to run'
)
checkCommand.action(async function (pattern, options) {
  //pattern = patternArgument.split(',').map((item) => item.trim())
  console.log('Pattern argument:')
  console.log(pattern)
  console.log('Plugin options:')
  console.log(options.plugin)
  await check({
    pattern
  })
})

module.exports = {
  checkCommand
}
