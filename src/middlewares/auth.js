const jwt = require('../modules/jwt');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {

        if (!accessToken && !refreshToken) {
            return res.status(404).json({ message: "로그인이 필요합니다." });
        }
        let user = await jwt.verify(accessToken);
        let refresh = await jwt.refreshVerify(refreshToken);
        if (refresh !== TOKEN_EXPIRED && refresh !== TOKEN_INVALID) { //refresh토큰이 있다면
            if (user === TOKEN_EXPIRED || user === TOKEN_INVALID) {
                let accToken = await jwt.sign(findUser);
                res.cookie('token', accToken);
            }
        }
        else {
            let refToken = await jwt.createRefreshToken();
            findUser.refreshToken = refToken;
            findUser.save();
        }
        if (user.id === undefined) {
            return res.status(400).json({ message: "회원이 없슈" });
        }
        req.userId = user.id;
        next();
    }
}
module.exports = authUtil;