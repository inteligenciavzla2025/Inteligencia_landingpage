module.exports = {
    apps: [{
        name: 'inteligencia-landing',
        script: 'server.js',
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
            NODE_ENV: 'production',
            PORT: 3000,
        },
    }],
};
