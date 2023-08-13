import { Router } from 'express';
import UserController from '../../controllers/UserController.js';

const usersRouter: Router = Router();

usersRouter.post('', UserController.createUser);
usersRouter.get('', UserController.getAllUsers);
usersRouter.get('/:id', UserController.getUser);

export default usersRouter;
