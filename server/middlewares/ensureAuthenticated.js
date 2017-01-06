import Promise from 'bluebird';
import Boom from 'boom';

export default (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(Boom.unauthorized('You have not access'));
};

export const logInPromise = (req, res, next) => {
  req.logInPromise = Promise.promisify(req.logIn);

  if (next) {
    return next();
  }
};
