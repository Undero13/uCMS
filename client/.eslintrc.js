module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-typescript"],
  env: {
    jest: true,
  },
  rules: {
    "@typescript-eslint/camelcase": "off",
    semi: [2, "always"],
    "import/extensions": "off",
    "class-methods-use-this": "off",
    "no-return-assign": "off",
    "no-restricted-globals": ["error", "event", "fdescribe"],
    //prettier work
    "comma-dangle": "off",
    "operator-linebreak": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/indent": "off",
    "implicit-arrow-linebreak": "off",
  },
};
