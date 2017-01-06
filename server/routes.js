import { Router } from 'express';
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

export default router;
