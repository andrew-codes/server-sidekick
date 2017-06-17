import {Logger} from './../logger';

test('multiple instances of a logger can be created', () => {
    const logger = new Logger();
    const logger2 = new Logger();
    expect(logger).not.toEqual(logger2);
});

