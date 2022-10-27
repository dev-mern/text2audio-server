const envInfo = {
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI,
}

module.exports = {
    envInfo
}