SystemJS.config({
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/",
      "ig_markerfactory/": "/dist/"
    }
  },
  nodeConfig: {
    "paths": {
      "npm:": "jspm_packages/npm/",
      "ig_markerfactory/": "dist/"
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.25"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "ig_markerfactory": {
      "main": "markerfactory.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {},
  packages: {}
});
