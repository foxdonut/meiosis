module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "parserOptions": {
    "sourceType": "module"
  },
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
        "printWidth": 100,
        "semi": true,
        "singleQuote": false
      }
    ]
  },
  "plugins": [
    "prettier"
  ]
}
