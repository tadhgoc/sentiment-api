module.exports = {
    name: 'election-api',
    version: '1.0.0',
    server: {
        port: process.env.PORT || 6789,
    },
    logging: {
        level: 'info',
        cli: false,
        timestamps: true,
        requests: false,
    },
    services: {
        newRelic: false,
    },
    database: {
        database: 'Election',
        username: 'ElectionGraphics',
        password: 'Election_!#GFX',
        host: 'CSQL15AG1Lis.nna.net',
    },
    redis: {
        enabled: true,
        host: 'devnetworkredis.e7hoya.0001.apse2.cache.amazonaws.com',
        port: 6379,
    },
};
