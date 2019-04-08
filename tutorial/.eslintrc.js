module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "mocha": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "prettier",
    "react"
  ],
  "rules": {
    "no-unused-vars": [
      "error",
      {
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "printWidth": 64,
        "semi": true,
        "singleQuote": false
      }
    ],
    "react/display-name": [
      0
    ],
    "react/jsx-no-undef": [
      1,
      { "allowGlobals": true }
    ],
    "react/prop-types": [
      0
    ]
  },
  "settings": {
    "react": {
      "pragma": "React"
    }
  }
};
