import { Router } from 'express';
import ensureAuthenticated from './middlewares/ensureAuthenticated';
import { getUser, logout, signIn } from './controllers/account';

const router = new Router();

router.get('/hello', (req, res) => {
  res.send('World');
});

router.get('/protected', ensureAuthenticated, getUser);
router.get('/logout', ensureAuthenticated, logout);
router.post('/signin', ensureAuthenticated, signIn);

export default router;
