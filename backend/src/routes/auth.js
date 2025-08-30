import express from 'express';
import { userLogin, userLogout, userSignup, verifyEmail } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup', userSignup);

router.post('/login', userLogin);

router.post('/logout', userLogout);

router.post('/verify-email', verifyEmail);
export default router;