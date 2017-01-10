import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import Account from './../models/account';
import config from './../config';

export default new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
  passReqToCallback: true
}, (req, token, refreshToken, profile, done) => {
  process.nextTick(() => {
    Account.findOne({ 'google.id': profile.id })
      .then(account => {
        if (account) {
          return done(null, account);
        }

        const newAccount = new Account();

        newAccount.google.id = profile.id;
        newAccount.google.token = token;
        newAccount.google.name = profile.displayName;
        newAccount.google.email = profile.emails[0].value;

        return newAccount.save();
      })
      .then(account => {
        if (account) {
          return done(null, account);
        }
      })
      .catch(err => done(err));
  });
});
