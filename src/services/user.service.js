const userModels = require('../models/userModels');
const { createHashedPassword, createSalt } = require('../utils/cryptoUtil');
const { createUUID } = require('../utils/uuidUtil');

module.exports = {

    getAllUsers: async () => {
        try {
            const users = await userModels.getAllUsers();
            return users;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding all users');
        }
    },

    getOneUser: async (data) => {
        try {
            const user = await userModels.getOneUser(data);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding by userId');
        }

    },

    createUser: async (reqData) => {
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
    // updateUser: async (reqData) => {
    //     const columName = reqData.params
    //     const { url } = reqData;
    //     console.log(url);
    //     return columName;
    // }
    // ,    
    upateUserName: async (reqData) => {
        try {
            const { user_id } = reqData.query;
            const columName = 'user_name';
            const current_ip = reqData.ip;
            const columValue = reqData.body.user_name;
            const user = await userModels.updateUserData(user_id, columValue, columName, current_ip);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating username!!');
        }
    },

    updateUserNickName: async (reqData) => {
        try {
            const { user_id } = reqData.query;
            const columName = 'nickname';
            const current_ip = reqData.ip;
            const columValue = reqData.body.nickname;
            const user = await userModels.updateUserData(user_id, columValue, columName, current_ip);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating nickname!!');
        }
    },

    updateUserPassword: async (reqData) => {
        try {
            const { user_id } = reqData.query;
            const columName = 'password';
            const { password } = reqData.body;
            const current_ip = reqData.ip;
            const csalt = await createSalt();
            const { hashedPassword, salt } = await createHashedPassword(password, csalt);
            const columValue = [hashedPassword, salt];
            const user = await userModels.updateUserData(user_id, columValue, columName, current_ip);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating password!!');
        }
    },

    updateUserEmail: async (reqData) => {
        try {
            const { user_id } = reqData.query;
            const columName = 'email';
            const columValue = reqData.body.email;
            const user = await userModels.updateUserData(user_id, columValue, columName);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating nickname!!');
        }
    },

    updateUserCellPhone: async (reqData) => {
        try {
            const { user_id } = reqData.query;
            const columName = 'cell_phone';
            const columValue = reqData.body.cell_phone;
            const user = await userModels.updateUserData(user_id, columValue, columName);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating nickname!!');
        }
    },

    deleteUser: async (reqData) => {
        try {
            const { user_id } = reqData.query;
            console.log(user_id);
            const user = await userModels.deleteUser(user_id);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Error while deleting user!!');
        }
    }
}