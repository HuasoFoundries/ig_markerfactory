SystemJS.config({
  transpiler: false,
  packages: {
    "ig_markerfactory": {
      "main": "markerfactory.js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "jquery": "npm:jquery@3.0.0",
    "lodash": "npm:lodash@4.13.1"
  },
  packages: {}
});
