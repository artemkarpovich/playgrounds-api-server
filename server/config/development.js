const config = {
  port: process.env.PORT || 3000,
  environment: 'development',
  database: 'mongodb://localhost:27017/playgrounds-api-server',
};

export default config;
module.exports = config;
