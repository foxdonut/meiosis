import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

const extensions = [".js", ".ts"];
const name = "Meiosis";

export default {
  input: "./index.ts",

  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({ extensions, include: ["index.ts", "state/index.ts", "router-helper/index.ts"] })
  ],

  output: [
    {
      file: "dist/meiosis-routing.js",
      name,
      format: "umd"
    }
  ]
};
