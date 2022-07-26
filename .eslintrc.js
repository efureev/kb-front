module.exports = {
  /* parser: 'vue-eslint-parser',
   parserOptions: {
   parser: '@typescript-eslint/parser',
   ecmaVersion: 2020,
   sourceType: 'module',
   ecmaFeatures: {
   tsx: true,
   jsx: true,
   },
   }, */
  globals: {
    dd: 'readonly',
  },
  extends: [
    '@antfu',
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    'pnpm-lock.yaml',
    '*.js',
  ]
}
