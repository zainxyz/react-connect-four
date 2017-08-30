module.exports = {
  env: {
    es6: true,
    browser: true,
    mocha: true,
    node: true,
  },
  extends: 'eslint-config-react-xyz',
  globals: {
    document: true,
    window: true,
  },
  parser: 'babel-eslint',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'no-template-curly-in-string': 'off',
    'react/forbid-prop-types': 'off',
    'valid-jsdoc': [
      'warn',
      {
        prefer: {
          returns: 'return',
          yield: 'yields',
        },
        preferType: {
          Boolean: 'boolean',
          Number: 'number',
          String: 'string',
          array: 'Array',
          function: 'Function',
          object: 'Object',
        },
        requireParamDescription: false,
        requireReturn: false,
        requireReturnDescription: false,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
};
