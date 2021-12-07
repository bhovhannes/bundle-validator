const { Command } = require('commander')
const { check } = require('../../lib/check.js')

const checkCommand = new Command('check')
checkCommand.description('Checks given JS files for trace occurencies')
checkCommand.arguments('<pattern>')
checkCommand.option('-t, --trace [trace]', 'the name of namespace containing strings')
checkCommand.action(async function (pattern, options) {
  await check({
    pattern,
    traces: options.traces || []
  })
})

module.exports = {
  checkCommand
}
