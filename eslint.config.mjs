import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	...tseslint.configs.recommended,
	eslintConfigPrettier,
];
