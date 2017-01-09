import { Router } from 'express';
import passport from 'passport';
import ensureAuthenticated, { logInPromise } from './middlewares/ensureAuthenticated';
import { getUser, logout, signIn, createAccount } from './controllers/account';

const router = new Router();

router.get('/hello', (req, res) => {
  res.send('World');
});

router.get('/protected', ensureAuthenticated, getUser);
router.get('/logout', ensureAuthenticated, logout);
router.post('/signin', logInPromise, signIn);
router.post('/signup', logInPromise, createAccount);
router.get('/google-signin', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google_signin', passport.authenticate('google', {
  successRedirect : '/api/v1/protected',
  failureRedirect : '/api/v1'
}));

export default router;
