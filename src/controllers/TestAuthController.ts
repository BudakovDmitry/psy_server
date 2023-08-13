import { Response, Request } from 'express';
import User from '../models/User.js';
import Role from '../models/Role.js';
// @ts-ignore
import bcrypt from 'bcryptjs';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { validationResult} from "express-validator";

// const generateAccessToken = (id: any, roles: string[]) => {
//   const payload = { id, roles }
//   return jwt.sign(payload, secret, { expiresIn: '24h'})
// }

class AuthController {
    async registration(req: Request, res: Response, next: any) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration error', errors})
            }
            const {username, password, phoneNumber} = req.body;
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message: 'User with this login exists'})
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, phoneNumber, password: hashPassword, roles: [userRole?.value]})
            user.save();
            return res.json({message: 'User successfully registered'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }

    }

    async login(req: Request, res: Response) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `User ${username} is not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: 'Wrong password'})
            }

            // const token = generateAccessToken(user._id, user.roles);
            // return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async logout(req: Request, res: Response, next: any) {
        try {

        } catch (e) {

        }
    }

    async activate(req: Request, res: Response, next: any) {
        try {

        } catch (e) {

        }
    }

    async refresh(req: Request, res: Response, next: any) {
        try {

        } catch (e) {

        }
    }

}

export default new AuthController();
