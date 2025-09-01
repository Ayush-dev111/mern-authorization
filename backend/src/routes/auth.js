import express from 'express';
import { checkAuth, resetPassword, userLogin, userLogout, userSignup, verifyEmail, forgetPassword } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/signup', userSignup);

router.post('/login', userLogin);

router.post('/logout', userLogout);

router.post('/verify-email', verifyEmail);

router.post('/forget-password', forgetPassword);

router.post('/reset-password/:token', resetPassword);

router.get('/check-auth', verifyToken, checkAuth);

export default router;