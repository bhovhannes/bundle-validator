import { Command } from 'commander'
import { checkCommand } from './commands/checkCommand.js'

const pkg = require('../../package.json')

export function getProgram() {
  const program = new Command()
  program.version(pkg.version)
  program.description(pkg.description)
  program.addCommand(checkCommand)
  return program
}
