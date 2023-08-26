import { Response, Request } from 'express';
import UserService from '../services/UserService.js';

interface UserQuery {
  roles?: {
    $in: string[]; // Виправлений тип для $in
  };
  // Додайте інші поля, які ви хочете використовувати для фільтрації
}

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
      const query: UserQuery = {};

      if(req.query.role) {
        query.roles = {
          // @ts-ignore
          $in: [req.query.role],
        };
      }
      const users = await UserService.getAllUsers(query);
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

  async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await UserService.updateUser(req.body);
      return res.json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
