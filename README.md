# Bundle Validator

[![NPM packages][npm-org-image]][npm-org-url] [![MIT License][license-image]][license-url]

A monorepo containing CLI tool for validating minified bundle content and related packages.

All packages in this repo are published under `@bundle-validator` scope. For example, `@bundle-validator/cli` or `@bundle-validator/plugin-bundle-size`

## Usage

First, install bundle validator either globally:

```shell
npm install -g @bundle-validator/cli
```

or add it to your project as a devDependency:

```shell
npm install --save-dev @bundle-validator/cli
```

Second, create a configuration. Bundle validator will start to search in your current directory and up the directory tree for the following:

- a `bv` property in package.json
- a `.bvrc` file in JSON or YAML format
- a `.bvrc.json`, `.bvrc.yaml`, `.bvrc.yml`, `.bvrc.js`, or `.bvrc.cjs` file
- a `bv.config.js` or `bv.config.cjs` CommonJS module exporting an object

And last, run the tool's `check` subcommand, providing glob patterns for finding files tool will validate and using `-c, --config` command line argument to specify a path to the configuration file, i.e.:

```shell
bv check --config "./tools/.bvrc.json" "./dist/*.js"
```

See [examples](#examples) section for more usage examples.

## Configuration

### `plugins`

Configuration has only one required option - `plugins`. By that option one should specify which plugins tool should use to validate provided set of files.  
For example:

```json
{
  "plugins": [
    [
      "@bundle-validator/plugin-bundle-size",
      {
        "maxSize": "128 KB"
      }
    ],
    "@bundle-validator/plugin-no-ie11"
  ]
}
```

Here, we specified 2 plugins - `@bundle-validator/plugin-bundle-size` and `@bundle-validator/plugin-no-ie11`. Some plugins may require options, in this example we provided `maxSize` option for `@bundle-validator/plugin-bundle-size` and no options for `@bundle-validator/plugin-no-ie11`.

Plugins are regular packages and should be installed from NPM. Official plugins are published under `@bundle-validator` scope.

### `reporter` and `reporterOptions`

To customize tool output, one can specify the name of reporter and, optional configuration for reporter using `reporterOptions` option. All [mocha reporters](https://mochajs.org/#reporters) are supported. Tool uses [spec reporter](https://mochajs.org/#spec) by default.  
For example:

```json
{
  "reporter": "tap",
  "plugins": ["@bundle-validator/plugin-no-ie11"]
}
```

## Examples

### Multiple pattern arguments, no config option

```console
$ npm install -g @bundle-validator/cli
$ LOG_LEVEL=debug bv check "./dist/*.js" "./output/**/*.min.js"
```

### One pattern argument, config option specified

```console
$ npm install -g @bundle-validator/cli
$ LOG_LEVEL=debug bv check --config ./tools/bv.config.js "./dist/*.js"
```

## Contributing

See our [Contributing Guide](./CONTRIBUTING.md).  
If you want to create a new plugin, please go through [Plugins](./docs/plugins.md).

## Contributors

- Amy Zhao

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[npm-org-image]: https://img.shields.io/badge/npm-bundle--validator-green.svg?style=flat
[npm-org-url]: https://www.npmjs.com/org/bundle-validator
