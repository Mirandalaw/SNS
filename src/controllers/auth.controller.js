const { authService, userService } = require('../services');

module.exports = {

    login: async (req, res) => {
        try {
            const { userId } = req.body;
            const user = await userService.findUser(userId);
            const isValid = await authService.login(user, req.body);
            if (isValid) return res.status(200).send('login success');
            return res.status(400).send('id or password is not correct!');
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    }
}