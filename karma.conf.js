module.exports = function(config) {
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
      "dist/markerfactory.js",
      "test/*.spec.js"
    ]
  });
};
