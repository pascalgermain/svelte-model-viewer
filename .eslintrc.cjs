module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint', 'simple-import-sort'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
		'import/no-duplicates': 'off',
		'import/order': 'off',
		'simple-import-sort/imports': [
			'warn',
			{
				// https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
				// https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
				groups: [
					['^\\u0000'], // side effect imports
					['^@sveltejs', '^svelte', '^@?\\w'], // starting with @sveltejs, with svelte, other "external" modules
					['^(?!\\$lib/components)'], // NOT starting with $lib/components
					['^', '^\\.'], // the rest, relative imports (starting wit a dot)
				],
			},
		],
		'simple-import-sort/exports': 'error',
	},
}
