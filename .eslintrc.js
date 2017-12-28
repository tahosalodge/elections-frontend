module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["src/", "node_modules/"],
      },
    },
  },
};
