// @ts-ignore
import jwt from 'jsonwebtoken';
import Token from '../models/Token.js'

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '2h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '14d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: any, refreshToken: string) {
        const tokenData = await Token.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await Token.create({user: userId, refreshToken})
        return token;
    }
}

export default new TokenService();