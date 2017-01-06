import Promise from 'bluebird';

export default (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/api/v1/hello');
};

export const logInPromise = (req, res, next) => {
  req.logInPromise = Promise.promisify(req.logIn);

  if (next) {
    return next();
  }
};
