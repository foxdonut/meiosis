import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import buble from "@rollup/plugin-buble";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/index.js",
    output: {
      file: "dist/meiosis-setup-preact.js",
      name: "MeiosisPreact",
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
      file: "dist/meiosis-setup-preact.min.js",
      name: "MeiosisPreact",
      format: "umd"
    },
    plugins: [
      resolve(),
      commonjs(),
      buble({
        exclude: ["node_modules/**"]
      }),
      terser()
    ]
  }
];
