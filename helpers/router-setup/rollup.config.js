import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

const extensions = [".js", ".ts"];
const name = "MeiosisRouterSetup";

export default {
  input: "./src/index.ts",

  plugins: [resolve({ extensions }), commonjs(), babel({ extensions, include: ["src/**"] })],

  output: [
    {
      file: "dist/meiosis-router-setup.js",
      name,
      format: "umd"
    }
  ]
};
