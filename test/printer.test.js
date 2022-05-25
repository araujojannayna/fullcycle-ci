const printer = require('../printer')

test('string with a number should result in the number itself', () => {
    expect(printer.print('1')).toBe('1');
});