module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "mocha": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-unused-vars": [
      "error",
      {
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "quotes": [
      "error",
      "double"
    ],
    "react/display-name": [
      0
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
