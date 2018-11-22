import './env';
import config from 'config';
import log from './utils/log';

// Require newrelic as early as possible.
if (config.services.newRelic) {
    require('newrelic');
}

const app = require('./app').default;

app.listen(config.server.port, (err) => {
    if (err) throw err;
    log.info(`Listening on port ${config.server.port} 🌏 `, {
        APP_ENV: process.env.APP_ENV,
        NODE_ENV: process.env.NODE_ENV,
    });
});

/* eslint global-require:0 */
/* eslint import/imports-first:0 */
/* eslint import/newline-after-import:0 */
