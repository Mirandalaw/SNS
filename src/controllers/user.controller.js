const { createHashedPassword, verifyPassword } = require('../utils/cryptoUtil');
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
            const data = await userService.findUser(req);
            if (data.length == 0) return res.status(404).send("User is not found");
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const data = await userService.insertUser(req);
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const data = await userService.updateUser(req);
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const data = await userService.deleteUser(req);
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

}