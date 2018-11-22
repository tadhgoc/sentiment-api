import config from 'config';
import { NoCache, Memory, Redis } from '@nec-network/cache';
import log from '../utils/log';

let Cache;
let redisClient;

if (process.env.ENABLE_CACHE === 'false') {
    Cache = NoCache;
} else if (config.redis.enabled && config.redis.host) {
    Cache = Redis;

    // eslint-disable-next-line global-require
    const redis = require('redis');

    redisClient = redis.createClient(config.redis.port, config.redis.host, {
        enable_offline_queue: false,
    });
    redisClient.on('error', error => log.error('Error connecting to Redis', error));
    redisClient.on('ready', () => log.info('Connected to Redis', config.redis));
} else {
    Cache = Memory;
}

log.debug('Cache Enabled:', Cache && Cache.name);

export default new Cache({
    minTtl: 60,
    maxTtl: 1800,
    redis: redisClient,
});
