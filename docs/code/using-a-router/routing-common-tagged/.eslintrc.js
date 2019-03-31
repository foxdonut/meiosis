module.exports = {
  "extends": ["eslint:recommended"],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
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
