module.exports = {
  root: true,
  extends: ['@react-native'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native'],
  rules: {
    // Enforce strict typing - NO ANY ALLOWED
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',

    // React Native specific rules
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
    'react-native/split-platform-components': 'warn',

    // React rules
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',

    // General code quality
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-magic-numbers': ['error', { ignore: [0, 1, -1, 2] }],
    'prefer-template': 'error',
    'object-shorthand': 'error',

    // Import rules
    'import/prefer-default-export': 'off',

    // Styling
    'max-len': ['error', { code: 100, ignoreUrls: true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
