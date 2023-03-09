const userModels = require('../models/userModels');
const { createHashedPassword, verifyPassword } = require('../utils/crytoUtil');
const createUUID = require('../utils/uuidUtil');

module.exports = {

    findUsers: async () => {
        try {
            const user = await userModels.getUsers();
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding all user!!');
        }
    },

    findUser: async (userId) => {
        try {
            const user = await userModels.getOneUser(userId);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding by userId!!');
        }

    },

    insertUser: async (body) => {
        try {
            const user_uuid = createUUID();
            const current_ip = body.ip;
            const { password } = body;
            const { hashedPassword, salt } = await createHashedPassword(password);
            const user = await userModels.createUser(user_uuid, current_ip, salt, hashedPassword, body);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while inserting user!!');
        }
    },

    updateUser: async (userId) => {
        try {
            const { password } = body;
            const user = await userModels.updateUser(userId, body);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating user!!');
        }
    },

    deleteUser: async (userId) => {
        try {
            const user = await userModels.deleteUser(userId);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while deleting user!!');
        }
    }
}