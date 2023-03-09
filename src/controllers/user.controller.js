const { createHashedPassword, verifyPassword } = require('../utils/crytoUtil');
const { userService } = require('../services');

module.exports = {

    findAll: async (req, res) => {
        try {
            const user = await userService.findUsers();
            return res.send({ user: user });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    findById: async (req, res) => {
        try {
            const userId = req.query.id;
            const data = await userService.findUser(userId);
            if (data.length == 0) return res.status(404).send("User is not found");
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const data = await userService.insertUser(req.body);
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const userId = req.query.id;
            const data = await userService.updateUser(userId, req.body);
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const userId = req.query.id;
            const data = await userService.deleteUser(userId);
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { userId, password } = req.body;
            const user = await userModels.getOneUser(id);
            if (user) {
                const verified = await verifyPassword(password, user[0].salt, user[0].password);
                if (!verified) return res.send({ message: "password is not correct" });
                return res.send(200);
            }
            else return res.send(400);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    }

}