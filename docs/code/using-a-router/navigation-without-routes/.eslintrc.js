module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": ["react"],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {
    "react/display-name": [ 0 ],
    "react/prop-types": [ 0 ],
    "indent": [ "error", 2 ],
    "linebreak-style": [ "error", "unix" ],
    "no-unused-vars": [
      "error",
      {
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "quotes": [ "error", "double" ],
    "semi": [ "error", "always" ]
  }
}
