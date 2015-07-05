var host = require('network-address')();

module.exports = {
    port: process.env.PORT || process.env.NODE_PORT || 8081,
    host: host,
    apiVersion: process.env.API_VERSION || 1,
    appUrl: 'http://$(host):$(port)',
    apiUrl: '$(appUrl)/v$(apiVersion)',
    bcrypt: {
        hashRounds: 1
    },
    auth: {
        cookieName: 'auth_token',
        signKey: 'c88afe1f6aa4b3c7982695ddd1cdd200bcd96662',
        tokenTTL: 1000 * 60 * 60 * 24 * 30 // 30 days
    }
};
