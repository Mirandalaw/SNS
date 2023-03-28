const { createHashedPassword, verifyPassword } = require('../utils/cryptoUtil');
const { userService } = require('../services');

module.exports = {

    findAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            if (users.length === 0) return res.status(404).send({ statusCode: 404, msg: "Users were not found" });
            return res.status(200).send({ data: users, statusCode: 200, msg: "Find all users" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },

    findOneUserById: async (req, res) => {
        try {
            const { userId } = req.query;
            const user = await userService.getOneUser(userId);
            if (user.length === 0) return res.status(404).send({ statusCode: 404, msg: "User was not found" });
            return res.status(200).send({ data: user, statusCode: 200, msg: "Find an user by id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },

    signUp: async (req, res) => {
        try {
            const user = await userService.createUser(req);
            return res.statusCode(201).send({ statusCode: 201, msg: "Success to signup user" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },
    updateName: async (req, res) => {
        try {
            const data = await userService.upateUserName(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update name" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },
    updateNickname: async (req, res) => {
        try {
            const data = await userService.updateUserNickName(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update nickname" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },
    updatePassword: async (req, res) => {
        try {
            const data = await userService.updateUserPassword(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update password" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },
    updateEmail: async (req, res) => {
        try {
            const data = await userService.updateUserEmail(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update email" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },
    updateCellPhone: async (req, res) => {
        try {
            const data = await userService.updateUserCellPhone(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update cell phone" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },
    // update: async (req, res) => {
    //     try {
    //         const data = await userService.updateUser(req);
    //         return res.status(200).send({ data: data, tatusCode: 201, msg: "Update Success!!" });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send({ error: error.message });
    //     }
    // }
    // ,
    delete: async (req, res) => {
        try {
            const data = await userService.deleteUser(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to delete user" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    }

}