SystemJS.config({
  transpiler: false,
  packages: {
    "ig_markerfactory": {
      "main": "ig_markerfactory.js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ]
});
