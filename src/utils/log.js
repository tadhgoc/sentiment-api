import { omit } from 'lodash';
import config from 'config';
import winston from 'winston';

const console = new winston.transports.Console({
    level: config.logging.level,
    timestamp: config.logging.timestamps,
});

const logger = new winston.Logger({
    exitOnError: false,
    transports: [
        console,
    ],
});

if (config.logging.cli) {
    logger.cli();
}

if (config.services.newrelic) {
    // eslint-disable-next-line global-require
    logger.add(require('newrelic-winston'), {});
}

function logError(error) {
    // We don't want these logged in production.
    if (error.status === 404 && process.env.NODE_ENV === 'production') {
        return;
    }

    logger.error(error.message, {
        ...omit(error, 'message'),
        stack: error.stack ? `\n${error.stack}` : null,
    });
}

export { logger as default, logError };
