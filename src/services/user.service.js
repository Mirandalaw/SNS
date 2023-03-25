const userModels = require('../models/userModels');
const { createHashedPassword, createSalt } = require('../utils/cryptoUtil');
const { createUUID } = require('../utils/uuidUtil');

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

    findUser: async (reqData) => {
        try {
            const { userId } = reqData.body.length !== 0 ? reqData.body : reqData.query;
            const user = await userModels.getOneUser(userId);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding by userId!!');
        }

    },

    insertUser: async (reqData) => {
        try {
            const user_uuid = createUUID();
            const current_ip = reqData.ip;
            const { password } = reqData.body;
            const csalt = await createSalt();
            const { hashedPassword, salt } = await createHashedPassword(password, csalt);
            const user = await userModels.createUser(user_uuid, current_ip, salt, hashedPassword, reqData.body);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while inserting user!!');
        }
    },

    updateUser: async (reqData) => {
        try {
            const { userId } = reqData.query;
            const { password } = reqData.body;
            const user = await userModels.updateUser(userId, reqData.body);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating user!!');
        }
    },

    deleteUser: async (reqData) => {
        try {
            const { userId } = reqData.query || reqData.body;
            const user = await userModels.deleteUser(userId);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while deleting user!!');
        }
    }
}