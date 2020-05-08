module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest/globals": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": [
      "error",
      {
        "args": "after-used",
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "printWidth": 100,
        "semi": true,
        "singleQuote": false,
        "trailingComma": "none",
        "arrowParens": "avoid"
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
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ]
    /*
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2]
    */
  },
  "plugins": [
    "jest",
    "prettier",
    "react"
  ],
  "settings": {
    "react": {
      "pragma": "React"
    }
  }
}
