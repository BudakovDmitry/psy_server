import User from '../models/User.js';
// @ts-ignore
import bcrypt from 'bcryptjs';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import MailService from "./MailService.js";
import TokenService from "./TokenService.js";
import UserDto from '../dtos/UserDto.js';
import ApiError from "../exceptions/ApiError.js";
import Token from "../models/Token";

class AuthService {
    async registration(email: string, password: string, name: string, phoneNumber: string) {
        const candidate = await User.findOne({ email })
        if (candidate) {
            throw ApiError.BadRequest(`Користувач з такою поштою ${email} вже існує`)
        }

        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuidv4();
        const user = await User.create({email, password: hashPassword, name, phoneNumber, activationLink})
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

    async login(email: string, password: string) {
        const user = await User.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Користувач з такою поштою не знайдений')
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Невірний пароль')
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: any) {
        const token = await TokenService.removeToken(refreshToken);
        return token
    }

    async refresh(refreshToken: any) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if(!userData || ! tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new AuthService();