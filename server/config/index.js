const environment = process.env.ENV || 'development';
const config = require(`./${environment}.js`);

export default config;
