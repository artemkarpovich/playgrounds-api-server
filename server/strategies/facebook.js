import FacebookStrategy from 'passport-facebook';
import Account from './../models/account';
import config from './../config';

export default new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
}, (token, refreshToken, profile, done) => {
  process.nextTick(() => {
    Account.findOne({ 'facebook.id': profile.id })
      .then(account => {
        if (account) {
          return done(null, account);
        }

        const newAccount = new Account();

        newAccount.facebook.id = profile.id;
        newAccount.facebook.token = token;
        newAccount.facebook.name  = `${profile.name.givenName} ${profile.name.familyName}`;
        newAccount.facebook.email = profile.emails[0].value;

        return newAccount.save();
      })
      .then(account => {
        if (account) {
          return done(null, account);
        }
      })
      .catch(error => done(error));
  });
});
