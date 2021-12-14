# Plugins

This tool is useless without plugins. Every check this tool does is implemented by some plugin.

Anytime the tool is run, it goes through the following stages:

1. Reads and validates configuration
2. Determines list of files to operate on
3. Based on effective configuration loads plugins
4. For each plugin:
   1. create a readonly **execution context** object
   2. store full resolved file path in a context
   3. for each file run plugin passing **execution context** as an argument
   4. add plugin result to the final report
5. Outputs resulting report

## Execution context

Execution context is a readonly object which bundle validator passes to each plugin.

Execution context has the following shape:

```typescript
type TExecutionContext = {
  log: (level: 'error' | 'warn' | 'info' | 'debug', messsage: string) => void
  filePath: string
}
```

Here,

`log` is a function plugins may call in case they want to output something. Having printing function like this abstracted is required for having consistent output format for all plugins.

`filePath` is a full resolved path to the file being processed.

## Plugin output

Plugins should come up with its execution result and can also print to console (using `log` method from plugin context).

Plugin result has the following shape:

```typescript
type TPluginResult = {
  message: string
  status: 'pass' | 'fail'
}
```

Here,

`message` is the error message which will be included in a final report.

`status` is an enum showing whenever plugin passed or failed.

## Plugin API

Each plugin is an NPM package with an entry point with the following exports:

```typescript
// plugin.js

function run(
  executionContext: TExecutionContext,
  pluginOptions: unknown
): TPluginResult | Promise<TPluginResult> {
  // plugin code goes here
}

function title(pluginOptions: unknown): string {
  // return plugin title to be displayed to user
}

module.exports = {
  run,
  title
}
```

Here, `run` method takes 2 arguments - first is execution context and second it an options object which is specific to each plugin. `run` method may call `executionContext.log` method to output during plugin execution and should return an object describing plugin result.  
`run` method can be asynchronous. In that case it should return a promise which will resolve with plugin result.

The `title` method is called by bundle validator to retrieve the plugin title tool displays to the user.

Plugin's `package.json` in this case has the following look:

```json
{
  "name": "my-cool-plugin",
  "main": "plugin.js"
}
```

All official plugins are published under `@bundle-validator` scope. For example, `@bundle-validator/plugin-bundle-size`.
