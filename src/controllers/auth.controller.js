const { authService, userService } = require('../services');

module.exports = {

    login: async (req, res) => {
        try {
            const { userId } = req.body;
            const user = await userService.findUser(userId);
            const accessToken = await authService.login(user, req.body);
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Authorization', 'Bearer ' + accessToken);
            if (accessToken) return res.status(200).send("success login");
            return res.status(400).send('id or password is not correct!');
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    test: async (req, res) => {
        try {

            return res.status(200).send('auth Test!!');

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    }
}