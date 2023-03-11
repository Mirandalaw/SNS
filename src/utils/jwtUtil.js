const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const redis = require('../utils/redisUtil');
const { options, secretKey } = require('../config/jwtconfig');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {

    //access 토큰 생성
    createAccessToken: async (user) => {
        const payload = {
            uuid: user.user_uuid,
        };
        const result =
            jwt.sign(payload, secretKey, options);
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
    refreshVerify: async (token, uuid) => {
        try {
            const data = await redis.get(uuid);
            if (data === token) {
                try {
                    jwt.verify(token, secretKey);
                    return true;
                } catch (error) {
                    if (error.message === 'jwt expired') {
                        console.log('expired token');
                        return TOKEN_EXPIRED;
                    } else if (error.message === 'invalid token') {
                        console.log('invalid token');
                    } else {
                        console.log('invalid token');
                        return TOKEN_INVALID;
                    }
                }
            }
            else return false;
        } catch (error) {
            return false;
        }
    }
}
