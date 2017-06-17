let logger = createLogger({
    transports: [],
});

export function createLogger({
                                 transports,
                             }) {
    return {
        log: (...messages) => transports.forEach(transport => transport.log(...messages)),
    };
};

export function configure(config) {
    logger = createLogger(config);
};

export default {
    log: (...messages) => logger.log(...messages),
};
