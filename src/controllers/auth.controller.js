const { authService, userService } = require('../services');
const jwt = require('../utils/jwtUtil');
module.exports = {

    login: async (req, res) => {
        try {
            const { userId } = req.body;
            const user = await userService.findUser(userId);
            const accessToken = await authService.login(user, req.body);
            if (accessToken) return res.status(200).send("success login");
            return res.status(400).send('id or password is not correct!');
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    test: async (req, res) => {
        try {
            const { user_id } = req.query;
            const user = await userService.findUser(user_id);
            return res.status(200).send(user);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    }
}