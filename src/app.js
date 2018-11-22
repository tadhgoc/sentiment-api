import config from 'config';
import Koa from 'koa';
import { assign } from 'lodash';
import { logError } from './utils/log';
import router from './router';

const app = new Koa();
app.name = config.name;
app.version = config.version;

// Originally required in index.js.
const newrelic = config.services.newRelic ? require('newrelic') : null;

assign(app.context, {
    newrelic,
});

app.use(router.routes());

app.on('error', (err) => {
    logError(err);
});

export default app;
