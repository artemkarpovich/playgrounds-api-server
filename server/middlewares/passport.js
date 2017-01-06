import LocalStrategy from 'passport-local';
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
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user.verifyPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      })
      .catch(err => done(err));
  }
  ));
};
