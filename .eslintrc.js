module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'productio·n' ? 0 : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 0 : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
