import logger, {configure, createLogger, transports} from './../logger';

test('multiple instances of a logger can be created', () => {
    const transports = [
        createTransport(),
    ];
    const logger = createLogger({transports});
    const logger2 = createLogger({transports});
    expect(logger).not.toEqual(logger2);
});
test('loggers accept one or more transports that handle how messages are logged', () => {
    const Console = createTransport();
    const File = createTransport();
    const consoleLogger = createLogger({
        transports: [
            Console,
            File,
        ],
    });

    consoleLogger.log(...createMessages());
    expect(Console.log).toBeCalledWith(...createMessages());
    expect(File.log).toBeCalledWith(...createMessages());
});
test('global level logger can be configured and used to log messages', () => {
    const transport = createTransport();
    configure({
        transports: [
            transport,
        ]
    });
    logger.log(...createMessages());
    expect(transport.log).toBeCalledWith(...createMessages());
});

//--
function createTransport() {
    return {
        log: jest.fn()
    };
}
function createMessages() {
    return [
        'one',
        'two',
        'three',
    ];
}
