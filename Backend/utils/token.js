import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export function generateToken(userId) {
    const secret = config.JWT_SECRET

    const refreshToken = jwt.sign(
        { userId },
        secret,
        { expiresIn: '7d' }
    )

    const accessToken = jwt.sign(
        { userId },
        secret,
        { expiresIn: '15m' }
    )

    return { refreshToken, accessToken }
}
