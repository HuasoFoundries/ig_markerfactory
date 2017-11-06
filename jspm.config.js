SystemJS.config({
  transpiler: 'plugin-babel',
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
    "lodash": "npm:lodash@4.13.1",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.19"
  },
  packages: {}
});
