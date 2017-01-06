import LocalStrategy from 'passport-local';
import Boom from 'boom';
import Account from './../models/account';

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Account.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  passport.use('local', new LocalStrategy({
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
  }
  ));
};
