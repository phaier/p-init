module.exports = {
  root: true,
  extends: ['@phaier/eslint-config-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },

  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, optionalDependencies: false, peerDependencies: false },
    ],
  },

  ignorePatterns: ['node_modules/'],
};
