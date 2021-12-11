# @bundle-validator/plugin-bundle-size

## Usage

1. Add plugin package as a devDependency:
   ```shell
   npm install @bundle-validator/plugin-bundle-size --save-dev
   ```
   or
   ```shell
   yarn add @bundle-validator/plugin-bundle-size --save-dev
   ```
2. Add this plugin to the `plugins` array of `bundle-validator` config:

   ```json
   {
     "plugins": [["@bundle-validator/plugin-bundle-size", { "maxSize": "64KB" }]]
   }
   ```

## Options

### `maxSize` (required)

Threshold that the file's size must be less than or equal to in order to pass.

Format: number (in bytes) or string (that uses units specified here: https://www.npmjs.com/package/xbytes#unitstring)

Warning: lowercase b will be interpreted as bits, uppercase b will be interpreted as bytes ("10 Kb" will be seen as kilobits, "10 KB" is 10 kilobytes)

Examples:

`"maxSize": "10KB"` (SI units)

`"maxSize": "10 KiB"` (IEC units)

`"maxSize": 10000` (10000 bytes)
