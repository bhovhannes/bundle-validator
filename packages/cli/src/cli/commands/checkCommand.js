const { Command } = require('commander')
const { check } = require('../../lib/check.js')

const checkCommand = new Command('check')
checkCommand.description('Checks given JS files for trace occurencies')
checkCommand.arguments('<pattern...>')
checkCommand.option(
  '-p, --plugin <names...>',
  'the names of the plugins that contain the checks to run'
)
checkCommand.option('-c, --config <path>', 'the path to the configuration file')
checkCommand.action(async function (pattern, options) {
  console.log('Pattern argument:')
  console.log(pattern)
  console.log('Config file path option:')
  console.log(options.config)
  await check({ pattern, configFilePath: options.config })
})

module.exports = {
  checkCommand
}
