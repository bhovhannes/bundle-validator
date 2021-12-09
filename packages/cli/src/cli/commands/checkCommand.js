const { Command } = require('commander')
const { check } = require('../../lib/check.js')

const checkCommand = new Command('check')
checkCommand.description('Checks given JS files for trace occurencies')
checkCommand.arguments('<pattern...>')
checkCommand.option('-c, --config <path>', 'the path to the configuration file')
checkCommand.action(async function (pattern, options) {
  await check({ pattern, configFilePath: options.config })
})

module.exports = {
  checkCommand
}
