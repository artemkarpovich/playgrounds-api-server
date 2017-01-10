const config = {
  port: process.env.PORT || 3000,
  environment: 'development',
  database: 'mongodb://localhost:27017/playgrounds-api-server',
  google: {
    'clientID'      : '515819044836-l2iokj4sdhdp438d8qq6le0s1ah7c7qu.apps.googleusercontent.com',
    'clientSecret'  : 'zQcekXGoLeXYfViJaxFNljHK',
    'callbackURL'   : 'http://localhost:3000/api/v1/auth/google/callback'
  },
};

export default config;
module.exports = config;
