import Example from './example';

describe('Example', () => {
	it('Gives the sum of two numbers', () => {
		expect(new Example().sum(1, 2)).toEqual(3);
	});
});
