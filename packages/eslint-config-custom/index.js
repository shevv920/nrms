module.exports = {
  extends: ["turbo", "prettier", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
  },
};
