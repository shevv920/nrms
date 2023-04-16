module.exports = {
  extends      : ['turbo', 'prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser       : '@typescript-eslint/parser',
  plugins      : ['@typescript-eslint'],
  parserOptions: {
    sourceType : 'module',
    ecmaVersion: 2022
  },
  rules        : {
    'quotes': ['error', 'single'],
    'turbo/no-undeclared-env-vars': 'off',
  }
};
