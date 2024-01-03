const { defineConfig } = require("cypress");

module.exports = defineConfig({
  devServer: {
    framework: "create-react-app",
    bundler: "webpack",
  },
});
