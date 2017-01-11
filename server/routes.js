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
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect : 'http://localhost:3001/index',
  failureRedirect : 'http://localhost:3001'
}));
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect : 'http://localhost:3001/index',
  failureRedirect : 'http://localhost:3001'
}));
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect : 'http://localhost:3001/index',
  failureRedirect : 'http://localhost:3001'
}));

export default router;
