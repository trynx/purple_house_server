module.exports = {
    secret: "groot-secret-key",
    jwtExpiration: 3600, // 1 hour
    jwtRefreshExpiration: 86400, // 24 hours
    // For tests
    // jwtExpiration: 10,
    // jwtRefreshExpiration: 30,
};
