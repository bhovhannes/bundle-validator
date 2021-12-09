# bundle-validator-monorepo

[![MIT License][license-image]][license-url]

A monorepo containing CLI tool for validating minified bundle content and related packages.

## Examples

### Multiple pattern arguments, no config option

```console
azhao@Amys-MBP bundle-validator % node packages/cli/src/main.js check "*.json" "**/bv.config.js"
Pattern argument:
[ '*.json', '**/bv.config.js' ]
Config file path option:
undefined
Files that match pattern:
[
  'nx.json',
  'package.json',
  'tsconfig.base.json',
  'workspace.json',
  'packages/cli/test/bv.config.js',
  'node_modules/bundle-validator/test/bv.config.js'
]
config option not specified, searching for default file path bv.config.js, .bvrc.json, etc.
Config:
{
  config: { plugins: [ 'plugin1', 'plugin2', 'plugin3' ] },
  filepath: '/Users/azhao/Documents/bundle-validator/.bvrc.json'
}
```

### One pattern argument, config option

```console
azhao@Amys-MBP bundle-validator % node packages/cli/src/main.js check "*.json" --config packages/cli/test/bv.config.js
Pattern argument:
[ '*.json' ]
Config file path option:
packages/cli/test/bv.config.js
Files that match pattern:
[ 'nx.json', 'package.json', 'tsconfig.base.json', 'workspace.json' ]
{
  config: { plugins: [ 'plugin1', 'p2', 'p3', 'p4' ] },
  filepath: '/Users/azhao/Documents/bundle-validator/packages/cli/test/bv.config.js'
}
```

## Contributors

- Amy Zhao

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
