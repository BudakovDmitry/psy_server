import User from '../models/User.js';
// @ts-ignore
import bcrypt from 'bcryptjs';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import MailService from "./MailService.js";
import TokenService from "./TokenService.js";
import UserDto from '../dtos/UserDto.js';
import ApiError from "../exceptions/ApiError.js";

class AuthService {
    async registration(email: string, password: string) {
        const candidate = await User.findOne({ email })
        if (candidate) {
            throw ApiError.BadRequest(`Користувач з такою поштою ${email} вже існує`)
        }

        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuidv4();
        const user = await User.create({email, password: hashPassword, activationLink})
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink: any) {
        const user = await User.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Невірне посилання на активацію')
        }
        user.isActivated = true;
        await user.save();
    }
}

export default new AuthService();