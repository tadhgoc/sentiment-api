module.exports = {
    name: 'sentiment-api',
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
    }
};
