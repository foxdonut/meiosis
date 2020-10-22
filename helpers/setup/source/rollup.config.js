import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "./src/index.js",
    output: {
      file: "dist/meiosis-setup.js",
      name: "Meiosis",
      format: "umd"
    },
    plugins: [
      resolve(),
      commonjs(),
      buble({
        exclude: ["node_modules/**"]
      })
    ]
  },
  {
    input: "./src/index.js",
    output: {
      file: "dist/meiosis-setup.min.js",
      name: "Meiosis",
      format: "umd"
    },
    plugins: [
      resolve(),
      commonjs(),
      buble({
        exclude: ["node_modules/**"]
      }),
      uglify()
    ]
  }
];
