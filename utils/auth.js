const jwt = require('jsonwebtoken');
const { executeQuery } = require('../config/database');

const dev = process.env.NODE_ENV === 'development';

const generateJWT = (userId, secret, expirationTime) => {
    return jwt.sign(
        {
            userId,
        },
        secret,
        { expiresIn: expirationTime }
    );
}
const clearTokens = async (req, res) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    if (refreshToken) {
        executeQuery(`DELETE FROM admin_refresh_tokens WHERE token LIKE ?`, [refreshToken])
    }
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: !dev,
        signed: true,
    });
};

module.exports = {
    generateJWT,
    clearTokens
};
