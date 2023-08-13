import { Response, Request } from 'express';
import AuthService from "../services/AuthService.js";
import { validationResult} from "express-validator";
import ApiError from "../exceptions/ApiError.js";

class AuthController {
  async registration(req: Request, res: Response, next: any) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // @ts-ignore
        return next(ApiError.BadRequest('Помилка при валідації', errors.array()))
      }
      const {email, password} = req.body;
      const userData = await AuthService.registration(email, password)

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch (e) {
      next(e)
    }

  }

  async login(req: Request, res: Response, next: any) {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.login(email, password)

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: any) {
    try {
      const { refreshToken } = req.cookies;
      const token = await AuthService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e)
    }
  }

  async activate(req: Request, res: Response, next: any) {
    try {
      const activationLink = req.params.link;
      await AuthService.activate(activationLink);
      // TODO Add correct Client url
      return res.redirect(process.env.CLIENT_URL || '')
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: any) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await AuthService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

}

export default new AuthController();
