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
            const { userId } = req.query;
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
            const data = await userService.insertUser(req);
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },
    updateName: async (req, res) => {
        try {
            const data = await userService.upateUserName(req);
            return res.status(200).send({ statusCode: 201, msg: "Update Name Success!!" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },
    updateNickname: async (req, res) => {
        try {
            const data = await userService.updateUserNickName(req);
            return res.status(200).send({ statusCode: 201, msg: "Update Nickname Success!!" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },
    updatePassword: async (req, res) => {
        try {
            const data = await userService.updateUserPassword(req);
            return res.status(200).send({ statusCode: 201, msg: "Update Password Success!!" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },
    updateEmail: async (req, res) => {
        try {
            const data = await userService.updateUserEmail(req);
            return res.status(200).send({ statusCode: 201, msg: "Update Email Success!!" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },
    updateCellPhone: async (req, res) => {
        try {
            const data = await userService.updateUserCellPhone(req);
            return res.status(200).send({ statusCode: 201, msg: "Update Cell Phone Success!!" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const data = await userService.deleteUser(req);
            console.log(data);
            return res.send({ data });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    }

}