module.exports = {
    swcMinify: false,
    serverRuntimeConfig: {
        dbConfig: {
            host: process.env.DB_HOST,
            port: '',
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        }
    },
    experimental: {
        serverComponentsExternalPackages: ['sequelize'],
    },
}