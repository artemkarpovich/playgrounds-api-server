import { OAuth2Strategy  as GoogleStrategy } from 'passport-google-oauth';
import Account from './../models/account';
import config from './../config';

export default new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
  passReqToCallback: true
}, (req, token, refreshToken, profile, done) => {
  process.nextTick(() => {
    console.log(token, 'token---');
    console.log(refreshToken, 'refreshToken----');
    console.log(profile, 'profile-----');
    Account.findOne({ 'google.id': profile.id })
      .then(account => {
        console.log(account, 'account');
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
        console.log(account, 'newaccount ----');
        return done(null, account);
      })
      .catch(err => done(err));
    /*Account.findOne({ 'google.id': profile.id }, function(err, user) {
      if (err)
        return done(err);
      if (user) {
        return done(null, user);
      } else {
        var newUser = new Account();
        newUser.google.id = profile.id;
        newUser.google.token = token;
        newUser.google.name = profile.displayName;
        newUser.google.email = profile.emails[0].value;
        newUser.save(function(err) {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }
    });*/
  });
});
