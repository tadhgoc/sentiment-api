import path from 'path';

// Until node-config has a way to switch the config environment, quickly
// flip the NODE_ENV to our APP_ENV then back again to initialise node-config
// with the correct environment.
const { NODE_ENV = 'development', APP_ENV = 'development' } = process.env;
process.env.APP_ENV = APP_ENV;
process.env.NODE_ENV = APP_ENV;
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');

require('config');

process.env.NODE_ENV = NODE_ENV;
