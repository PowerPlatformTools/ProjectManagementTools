module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:storybook/recommended"],
  "globals": {
    "ComponentFramework": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@microsoft/power-apps", "@typescript-eslint"],
  "rules": {
    "no-unused-vars": "off"
  }
};