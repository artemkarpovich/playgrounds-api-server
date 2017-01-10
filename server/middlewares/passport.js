import Account from './../models/account';
import localSignInStrategy from './../strategies/local';
import googleSignInStrategy from './../strategies/google';
import facebookSignInStrategy from './../strategies/facebook';

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Account.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  passport.use('local', localSignInStrategy);
  passport.use('google', googleSignInStrategy);
  passport.use('facebook', facebookSignInStrategy);
};
