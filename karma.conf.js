module.exports = function(config) {
  function getSpecs() {
    var prefix = process.env.KARMA_SPECS; // eslint-disable-line
    if (!prefix) {
      return ["test/*.spec.js"];
    }
    return [`test/${prefix}*.spec.js`];
  }

  config.set({
    basePath: "",
    port: 9877,
    colors: true,
    logLevel: "INFO",
    autoWatch: false,
    browsers: ["PhantomJS"],
    singleRun: true,
    frameworks: ["jasmine"],
    reporters: ["mocha"],

    files: [
      "examples/css/fontello.css",
      "examples/css/font-awesome.css",
      "test/vendor/object-assign-polyfill.js",
      "test/vendor/object-entries-polyfill.js",
      "test/vendor/prototype-bind-polyfill.js",
      "test/vendor/underscore.js",
      "dist/markerfactory.js"
    ].concat(getSpecs())
  });
};
