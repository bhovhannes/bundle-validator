const { Command } = require('commander')
const { checkCommand } = require('./commands/checkCommand.js')

const pkg = require('../../package.json')

function getProgram() {
  const program = new Command()
  program.version(pkg.version)
  program.description(pkg.description)
  program.addCommand(checkCommand)
  return program
}

module.exports = {
  getProgram
}
