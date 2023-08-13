import { Response, Request } from 'express';
import UserService from '../services/UserService.js';

class UserController {

  async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body)
      res.json(user)
    } catch (error) {
      res.status(500).json(error);
    }

  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUser(req.params.id);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
