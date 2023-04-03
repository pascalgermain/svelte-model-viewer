module.exports = {
	useTabs: true,
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	htmlWhitespaceSensitivity: 'ignore',
	plugins: ['prettier-plugin-svelte', require('prettier-plugin-tailwindcss')],
	pluginSearchDirs: ['.'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
}
