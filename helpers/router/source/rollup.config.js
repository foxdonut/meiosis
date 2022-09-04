import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const name = 'Meiosis';
const input = './src/router.ts';
const extensions = ['.js', '.ts'];
const babelHelpers = 'bundled';

const plugins = [
  resolve({ extensions }),
  commonjs(),
  babel({
    babelHelpers,
    extensions,
    include: ['src/**']
  })
];

const output = {
  name,
  format: 'umd'
};

export default [
  {
    input,
    plugins,
    output: Object.assign(
      {
        file: 'dist/meiosis-router.js'
      },
      output
    )
  },
  {
    input,
    plugins: plugins.concat(terser()),
    output: Object.assign(
      {
        file: 'dist/meiosis-router.min.js'
      },
      output
    )
  }
];
