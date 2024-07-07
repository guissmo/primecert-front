import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteConfig from './svelte.config.js';
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    files: [
      '**/*.svelte',
      '*.svelte',
      // Add more files if you need.
      // '**/*.svelte.ts', '*.svelte.ts', '**/*.svelte.js', '*.svelte.js',
    ],
    rules: {
      // override/add rules settings here, such as:
      // 'svelte/rule-name': 'error'
    },
    languageOptions: {
      parserOptions: {
        // Specify the `svelte.config.js`.
        svelteConfig,
      },
    },
  },
];
