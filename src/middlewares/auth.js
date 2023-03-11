const jwt = require('../utils/jwtUtil');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authMiddleware = {

    checkToken: async (req, res, next) => {
        console.log(typeof req.headers.authorization)
        const token = req.headers.authorization.split('Bearer ')[1];
        console.log(token);

        next();
    }
}
module.exports = authMiddleware;