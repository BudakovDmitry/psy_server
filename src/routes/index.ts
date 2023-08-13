import { Application } from 'express';
import usersRouter from './api/usersRouter.js';
import authRouter from "./api/authRouter.js";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/users', usersRouter);
    this.app.use('/api/auth', authRouter);
    this.app.use(ErrorMiddleware)
  }
}

export default AppRouter;
