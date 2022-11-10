// TODO: Inject secrets from environment variable

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "peoriafresh",
    DB: "peoriafresh",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};