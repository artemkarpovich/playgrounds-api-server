import LocalStrategy from 'passport-local';
import Account from './../models/account';
import Boom from 'boom';

export default new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true,
}, (req, email, password, done) => {
  Account.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, Boom.unauthorized('User does not found'));
      }

      if (!user.verifyPassword(password)) {
        return done(null, false, Boom.unauthorized('Password is not correct'));
      }

      return done(null, user);
    })
    .catch((err) => done(Boom.badImplementation(err)));
});
