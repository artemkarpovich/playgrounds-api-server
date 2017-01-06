import passport from 'passport';

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
    if (!user) return res.json(info);

    req.logInPromise(user)
      .then(() => res.json(req.user))
      .catch(err => next(err));
  })(req, res, next);
}
