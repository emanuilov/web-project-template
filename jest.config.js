module.exports = {
	rootDir: './',
	roots: ['<rootDir>/src/js'],
	moduleFileExtensions: ['js', 'jsx', 'json'],
	moduleDirectories: ['node_modules'],
	transform: {
		'^.+\\.(t|j)sx?$': 'babel-jest'
	},
	preset: 'jest-puppeteer',
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.((t|j)sx?)$'
};
