module.exports = {
	'env': {
		'node': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'prettier'
	],
	'parserOptions': {
		'ecmaVersion': 13,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};