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
     "plugins": [["../../../plugin-bundle-size", { "maxSize": "64KB" }]]
   }
   ```

```

## Options

### `maxSize` (required)

Threshold that the file's size must be less than or equal to in order to pass.

Format: number + IEC unit (B, KB, MB, GB, TB, PB)

Example: "2342B" for 2342 bytes, "19KB" for 19 kilobytes, etc.
```
