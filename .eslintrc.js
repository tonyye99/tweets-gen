module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: [],
  rules: {
    semi: 'error',
    indent: [
      'error',
      2
    ],
    '@typescript-eslint/space-before-function-paren': 'error',
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-newline': 'off'
  }
}
