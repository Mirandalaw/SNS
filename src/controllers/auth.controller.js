const { authService, userService } = require('../services');
const jwt = require('../utils/jwtUtil');
module.exports = {

    login: async (req, res) => {
        try {
            const user = await userService.findUser(req.body.userId);
            const accessToken = await authService.login(user, req);
            if (accessToken) return res.status(200).send({ token: accessToken, statusCode: 200, msg: "success login" });
            return res.status(400).send('id or password is not correct!');
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    }
}