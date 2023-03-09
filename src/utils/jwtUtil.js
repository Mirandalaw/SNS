const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const { options, secretKey } = require('../../../config/secretKey');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {

    //access 토큰 생성
    sign: async (user) => {
        const payload = {
            id: user.userId,
            name: user.name,
        };
        const result = {
            token: jwt.sign(payload, secretKey, options),
        };
        return result;
    },

    //refresh 토큰 생성
    createRefreshToken: async () => {
        const result =
            jwt.sign({}, secretKey, {
                algorithm: 'HS256',
                expiresIn: '14d',
            })
        return result;
    },

    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (error) {
            if (error.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (error.message === 'invalid token') {
                console.log('invalid token');
                return TOKEN_INVALID;
            } else {
                console.log('invalid token');
                return TOKEN_INVALID;
            }
            return decoded;
        }
    },
}
