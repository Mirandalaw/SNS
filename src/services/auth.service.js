const { verifyPassword } = require('../utils/crytoUtil');
const jwt = require('../utils/jwtUtil');
const redis = require('../utils/redisUtil');

module.exports = {

    login: async (user, body, headers) => {
        try {
            const { user_pwd } = body;
            const { salt, password, user_uuid } = user[0];
            if (user) {
                const verified = await verifyPassword(user_pwd, salt, password);
                if (verified) {
                    const accessToken = await jwt.createAccessToken(user);
                    const refreshToken = await jwt.createRefreshToken();
                    await redis.set(user_uuid, refreshToken);
                    await redis.expire(user_uuid, 3600 * 24 * 14);
                    return accessToken;
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error('login is failed');
        }
    }
}