import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "./index.js",
    output: {
      file: "dist/meiosis-routing.js",
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
    input: "./index.js",
    output: {
      file: "dist/meiosis-routing.min.js",
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
