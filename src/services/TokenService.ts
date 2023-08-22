// @ts-ignore
import jwt from 'jsonwebtoken';
import Token from '../models/Token.js'

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '2h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d'})

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: any) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: any) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
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

    async removeToken(refreshToken: any) {
        const tokenData = await Token.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken: any) {
        const tokenData = await Token.findOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService();