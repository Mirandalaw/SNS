const { verifyPassword } = require('../utils/cryptoUtil');
const jwt = require('../utils/jwtUtil');
const redis = require('../utils/redisUtil');
const { TOKEN_INVALID, TOKEN_EXPIRED, ACCESSTOKEN_INVALID, REFRESHTOKEN_INVALID, ACCESSTOKEN_EXPIRED, REFRESHTOKEN_EXPIRED } = require('../config/defconfig');

module.exports = {

    login: async (user, reqData) => {
        try {
            const { user_pwd } = reqData.body;
            const { salt, password, user_uuid } = user[0];
            if (user.length !== 0) {
                const verified = await verifyPassword(user_pwd, salt, password);
                if (verified) {
                    const accessToken = await jwt.createAccessToken(user_uuid);
                    const refreshToken = await jwt.createRefreshToken();
                    await redis.set(user_uuid, refreshToken);
                    await redis.expire(user_uuid, 10 * 60);
                    return accessToken;
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error('login is failed');
        }
    },

    verifyToken: async (reqData) => {
        try {
            const { user_uuid } = reqData.query;
            const accessToken = reqData.headers.authorization.split('Bearer ')[1];
            const accTokenInfo = await jwt.verify(accessToken); // => invalid, expired, {payload}             // accessToken이 invalid된 경우 (accessToken 이 변조된 경우)
            if (accTokenInfo === TOKEN_INVALID) return { accessToken: null, result: ACCESSTOKEN_INVALID };

            // accessToken이 expired된 경우 (accessToken이 만료된 경우)
            else if (accTokenInfo === TOKEN_EXPIRED) {
                // refreshToken 의 유효성 검사 
                const refreshToken = await redis.get(user_uuid);
                const refTokenInfo = await jwt.refreshVerify(refreshToken, user_uuid);
                if (refTokenInfo === TOKEN_INVALID) return { accessToken: null, result: REFRESHTOKEN_INVALID };
                if (refTokenInfo === TOKEN_EXPIRED) return { accessToken: null, result: REFRESHTOKEN_EXPIRED };
                else if (refTokenInfo) {
                    let new_accessToken = await jwt.createAccessToken(user_uuid);
                    return { accessToken: new_accessToken, result: ACCESSTOKEN_EXPIRED }; //refreshToken 이 있으니 access 재발급 해서 result 값주고
                }
            }
            else {
                return { accessToken: accessToken, result: true };
            }
        } catch (error) {
            console.log(error);
        }
    }
}