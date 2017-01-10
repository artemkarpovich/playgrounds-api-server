const config = {
  port: process.env.PORT || 3000,
  environment: 'development',
  database: 'mongodb://localhost:27017/playgrounds-api-server',
  google: {
    'clientID': '515819044836-l2iokj4sdhdp438d8qq6le0s1ah7c7qu.apps.googleusercontent.com',
    'clientSecret': 'zQcekXGoLeXYfViJaxFNljHK',
    'callbackURL': 'http://localhost:3000/api/v1/auth/google/callback'
  },
  facebook: {
    'clientID': '309586256104734',
    'clientSecret': '0b64fc170dfc9e0deb15e90a04b3428d',
    'callbackURL': 'http://localhost:3000/api/v1/auth/facebook/callback'
  },
};

export default config;
module.exports = config;
