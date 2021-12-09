# bundle-validator-monorepo

[![MIT License][license-image]][license-url]

A monorepo containing CLI tool for validating minified bundle content and related packages.

## Examples

### Multiple pattern arguments, no config option

```console
$ npm install -g bundle-validator
$ LOG_LEVEL=debug bv check "./dist/*.js" "./output/**/*.min.js"
```

### One pattern argument, config option specified

```console
$ npm install -g bundle-validator
$ LOG_LEVEL=debug bv check --config ./tools/bv.config.js "./dist/*.js"
```

## Contributors

- Amy Zhao

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
