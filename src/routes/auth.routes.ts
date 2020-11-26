import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import user from '../models/user';

const router = Router();

router.route('/signup')
    .post(authController.signup)

router.route('/login')
    .post(authController.signin)

export default router; 