import passport from 'passport';
import Boom from 'boom';
import Account from './../models/account';

export function getUser(req, res) {
  res.json(req.user);
}

export function logout(req, res) {
  req.logOut();
  res.json({ status: true });
}

export function signIn(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(info);

    req.logInPromise(user)
      .then(() => res.json(req.user))
      .catch(err => next(err));
  })(req, res, next);
}

export function createAccount(req, res, next) {
  Account.findOne({ email: req.body.email })
    .then(account => {
      if (account) {
        return next(Boom.conflict('Account already exists'));
      }

      return Account.create({
        email: req.body.email,
        password: Account.generateHash(req.body.password)
      });
    })
    .then(account => req.logInPromise(account))
    .then(() => res.json(req.user))
    .catch(err => next(err));
}
