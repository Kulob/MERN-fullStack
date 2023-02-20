import { Router } from 'express';
import { register, login, getMe } from '../controllers/UserControllers.js';
import { checkAuth } from '../utills/checkAuth.js';

const router = new Router();

// Register
router.post('/register', register);
// Login
router.post('/login', login);
// Get Me
router.get('/me', checkAuth, getMe);
export default router;
