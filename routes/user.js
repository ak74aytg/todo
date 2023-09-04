import express from 'express';
import { register, login, logout, getMyProfile } from '../controller/user.js';
import { isAuthenticated } from '../middleware/authenticate.js'

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isAuthenticated, getMyProfile);

export default router;