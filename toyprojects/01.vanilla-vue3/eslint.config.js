import globals from 'globals';

export default [
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      }
    },
    // ... other settings
  }
];