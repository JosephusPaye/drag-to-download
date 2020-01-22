const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

module.exports = [
  {
    input: ['src/content-script.js'],
    output: {
      file: 'dist/content-script.js',
      format: 'iife',
    },
    plugins: [resolve(), terser()],
    context: 'window',
  },
  {
    input: ['src/background.js'],
    output: {
      file: 'dist/background.js',
      format: 'iife',
    },
    plugins: [resolve(), terser()],
    context: 'window',
  },
];
