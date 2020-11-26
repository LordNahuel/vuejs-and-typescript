import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import passport from 'passport';
import isAdmin from "../middlewares/isAdmin"; 
import isLogin from '../middlewares/isLogin';

const router = Router();

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), isLogin, isAdmin, userController.getAll)
    .post(passport.authenticate('jwt', { session: false }), userController.save)

router.route('/:_id')
    .get(passport.authenticate('jwt', { session: false }), userController.getById)
    .put(passport.authenticate('jwt', { session: false }), userController.update)
    .delete(passport.authenticate('jwt', { session: false }), userController.remove)

export default router; 