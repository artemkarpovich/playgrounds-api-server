import TwitterStrategy from 'passport-twitter';
import Account from './../models/account';
import config from './../config';

export default new TwitterStrategy({
  consumerKey: config.twitter.consumerKey,
  consumerSecret: config.twitter.consumerSecret,
  callbackURL: config.twitter.callbackURL
}, (token, refreshToken, profile, done) => {
  process.nextTick(() => {
    Account.findOne({ 'twitter.id': profile.id })
      .then(account => {
        if (account) {
          return done(null, account);
        }

        const newAccount = new Account();

        newAccount.twitter.id = profile.id;
        newAccount.twitter.token = token;
        newAccount.twitter.name  = profile.username;
        newAccount.twitter.displayName = profile.displayName;

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
