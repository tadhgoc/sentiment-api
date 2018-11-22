// Exposes overridable config values to environment variables.
module.exports = {
    services: {
        newRelic: {
            // Parses string boolean as a real boolean.
            __name: 'NEW_RELIC_ENABLED',
            __format: 'json',
        },
    },
};
