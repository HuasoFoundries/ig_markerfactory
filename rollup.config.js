import uglify from 'rollup-plugin-uglify';
import strip from 'rollup-plugin-strip';
import replace from 'rollup-plugin-replace';

var input = "./src/markerfactory.js",
  plugins = [
    strip({
      debugger: true,
      functions: ['console.log', 'assert.*', 'debug', 'alert'],
      sourceMap: !!process.env.MINIFY
    }),
    replace({
      const: 'var',
      let: 'var'
    })
  ],
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