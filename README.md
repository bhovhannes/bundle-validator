# bundle-validator-monorepo

[![MIT License][license-image]][license-url]

A monorepo containing CLI tool for validating minified bundle content and related packages.

## Examples

```console
azhao@Amys-MBP bundle-validator % node packages/cli/src/main.js check "*.json, **/*.spec.js"
Pattern argument:
[ '*.json', '**/*.spec.js' ]
Plugin options:
undefined
Files that match pattern:
[
  'nx.json',
  'package.json',
  'tsconfig.base.json',
  'workspace.json',
  'packages/cli/test/cli.spec.js',
  'packages/cli/test/lib.spec.js',
  'node_modules/bundle-validator/test/cli.spec.js',
  'node_modules/bundle-validator/test/lib.spec.js',
  'node_modules/json-schema-traverse/spec/index.spec.js',
  'node_modules/rxjs-for-await/dist/cjs/__tests__/index.spec.js',
  'node_modules/rxjs-for-await/dist/esm/__tests__/index.spec.js',
  'node_modules/table/node_modules/json-schema-traverse/spec/index.spec.js'
]
```

```console
azhao@Amys-MBP bundle-validator % node packages/cli/src/main.js check "*.json" --plugin plugin1 plugin2 plugin3
Pattern argument:
[ '*.json' ]
Plugin options:
[ 'plugin1', 'plugin2', 'plugin3' ]
Files that match pattern:
[ 'nx.json', 'package.json', 'tsconfig.base.json', 'workspace.json' ]
```

## Contributors

- Amy Zhao

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
