const { Command } = require('commander')
const { check } = require('../../lib/check.js')

const checkCommand = new Command('check')
checkCommand.description('Checks given JS files for trace occurencies')
checkCommand.arguments('<pattern>')
checkCommand.option('-t, --trace [trace]', 'the name of namespace containing strings')
checkCommand.option(
  '-p, --plugin <names...>',
  'the names of the plugins that contain the checks to run'
)
checkCommand.action(async function (pattern, options) {
  console.log(options.plugin)
  console.log(options.trace)
  await check({
    pattern,
    traces: options.trace || []
  })
})

module.exports = {
  checkCommand
}
