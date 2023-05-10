import { Router } from 'express';
import authController from '../controllers/authentication/authController.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', authController.verify);

export default router;
