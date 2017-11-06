import uglify from 'rollup-plugin-uglify';

var input = "./src/markerfactory.js",
  plugins = [],
  output = [{
    file: "dist/markerfactory.js",
    format: "umd",
    exports: 'named',
    name: 'MarkerFactory'
  }, {
    file: "dist/markerfactory.es6.js",
    format: "es",
  }];

if (process.env.MINIFY) {
  plugins.push(uglify({
    mangle: false
  }));
  output = {
    file: "dist/markerfactory.min.js",
    format: "umd",
    exports: 'named',
    name: 'MarkerFactory',
    sourcemap: true
  };
}

export default {
  input: input,
  plugins: plugins,
  output: output,
  extend: true
};