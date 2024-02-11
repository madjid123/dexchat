module.exports = {


  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/recommended',

    'plugin:@typescript-eslint/recommended',
],
  //   'plugin:@typescript-eslint/recommended',
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier'],
  ignorePatterns: ['vite.config.ts'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    typescript: true,project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // 'prettier/prettier': 'error',
  },


  // parser: '@typescript-eslint/parser',
  // plugins: ["@typescript-eslint"],
  // extends: [
  //   // By extending from a plugin config, we can get recommended rules without having to add them manually.
  //   'eslint:recommended',
  //   'plugin:react/recommended',
  //   'plugin:import/recommended',
  //   'plugin:jsx-a11y/recommended',
  //   'plugin:@typescript-eslint/recommended',
  //   'plugin:import/typescript',
  //   "plugin:@typescript-eslint/recommended-requiring-type-checking",

  //   // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
  //   // Make sure it's always the last config, so it gets the chance to override other configs.
  //   'eslint-config-prettier',
  // ],
  // settings: {
  //   react: {
  //     // Tells eslint-plugin-react to automatically detect the version of React to use.
  //     version: 'detect',
  //   },
  //   // Tells eslint how to resolve imports
  //   'import/resolver': {
  //     typescript: {
  //       paths: ['src'],
  //       extensions: ['.js', '.jsx', '.ts', '.tsx']
  //     },
  //     node: {
  //       paths: ['src'],
  //       extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //     },
  //   },
  // },
  // rules: {
  //   // Add your own rules here to override ones from the extended configs.
  //   'react/react-in-jsx-scope': 'off', // Disable the rule that enforces React to be in scope

  // },
  // ignorePatterns: ['vite.config.ts'],
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   project: ['./tsconfig.json'], // Specify it only for TypeScript files
  // },
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'],
  //     rules: {
  //       // Add your own TypeScript-specific rules here.
  //     },
  //     parserOptions: {
  //       project: ['./tsconfig.json'], // Specify it only for TypeScript files
  //     },
  //   },
  // ],
};
