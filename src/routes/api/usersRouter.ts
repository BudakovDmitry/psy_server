import { Router } from 'express';
import UserController from '../../controllers/UserController.js';
import AuthMiddleware from "../../middlewares/AuthMiddleware.js";

const usersRouter: Router = Router();

usersRouter.post('', UserController.createUser);
usersRouter.get('', AuthMiddleware, UserController.getAllUsers);
usersRouter.get('/:id', UserController.getUser);

export default usersRouter;
