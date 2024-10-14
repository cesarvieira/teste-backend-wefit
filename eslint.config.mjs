import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
    },
  }},
  ...tseslint.configs.recommended,
  eslintConfigPrettier
];
