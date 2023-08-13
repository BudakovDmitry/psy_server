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
      // const {username, password} = req.body;
      // const user = await User.findOne({username})
      // if (!user) {
      //   return res.status(400).json({message: `User ${username} is not found`})
      // }
      // const validPassword = bcrypt.compareSync(password, user.password)
      // if (!validPassword) {
      //   return res.status(400).json({message: 'Wrong password'})
      // }

      // const token = generateAccessToken(user._id, user.roles);
      // return res.json({token})
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: any) {
    try {

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

    } catch (e) {
      next(e)
    }
  }

}

export default new AuthController();
