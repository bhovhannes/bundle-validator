#!/usr/bin/env node

const { LoggedError } = require('./lib/LoggedError.js')
const { getProgram } = require('./cli/getProgram.js')

const program = getProgram()
program.parseAsync().catch((e) => {
  if (!(e instanceof LoggedError)) {
    // uncaught errors get logged to stderr
    console.error(e)
  }
  process.exitCode = 1
})
