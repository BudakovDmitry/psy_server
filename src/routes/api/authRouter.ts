import { Router } from 'express';
import AuthController from '../../controllers/AuthController.js';
import { body } from 'express-validator';

const authRouter: Router = Router();

authRouter.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3 }), AuthController.registration);
authRouter.post('/login', AuthController.login);
authRouter.post('/logout', AuthController.logout);
authRouter.get('/activate/:link', AuthController.activate);
authRouter.get('/refresh', AuthController.refresh);

export default authRouter;
