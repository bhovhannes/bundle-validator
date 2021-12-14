# @bundle-validator/plugin-bundle-content

Checks if file does not bundle given libraries.

## Usage

1. Add plugin package as a devDependency:
   ```shell
   npm install @bundle-validator/plugin-bundle-content --save-dev
   ```
   or
   ```shell
   yarn add @bundle-validator/plugin-bundle-content --save-dev
   ```
2. Add this plugin to the `plugins` array of `bundle-validator` config:

   ```json
   {
     "plugins": [["@bundle-validator/plugin-bundle-content", { "externals": ["lodash"] }]]
   }
   ```

## Options

### `externals` (required)

Use to specify which packages should not be included in a given JS file.

Currently, plugin is able to detect presence of following libraries:

`lodash` - https://lodash.com/
