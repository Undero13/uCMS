module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
    'prettier/@typescript-eslint'
  ],
  "env": {
    "jest": true
  },
  rules: {
    "@typescript-eslint/camelcase": "off",
    "semi": [2, "always"],
    "import/extensions": "off",
    "class-methods-use-this": "off",
    "no-return-assign": "off"
  }
};