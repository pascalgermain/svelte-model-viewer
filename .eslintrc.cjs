module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'simple-import-sort'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
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
