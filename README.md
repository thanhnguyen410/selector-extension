# Mkt Login

```bash
# Install dependencies
yarn install

# Compiles and hot-reloads for development for the chrome browser
yarn dev

# Compiles and minifies for production for the chrome browser
yarn build

# Create a zip file from the build folder
yarn build:zip

# Compiles and hot-reloads for development for the firefox browser
yarn dev:firefox

# Compiles and minifies for production for the firefox browser
yarn build:firefox

# Lints and fixes files
yarn lint
```

### Install Locally

#### Chrome

1. Open chrome and navigate to extensions page using this URL: chrome://extensions.
2. Enable the "Developer mode".
3. Click "Load unpacked extension" button, browse the `selector-extension/build` directory and select it.

### Firefox

1. Open firefox and navigate to `about:debugging#/runtime/this-firefox`.
2. Click the "Load Temporary Add-on" button.
3. Browse the `selector-extension/build` directory and select the `manifest.json` file.
