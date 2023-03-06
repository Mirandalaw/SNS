const pool = require('./db');

const getUsers = async () => {
    try {
        const sql = 'SELECT * FROM Users';
        const result = await pool.execute(sql,);
        return result[0];
    } catch (error) {
        throw new Error('Error is while finding users ');
    }
}

const createUser = async (userName, userId, userPwd, birthDate, sex) => {
    try {
        const sql = `INSERT INTO Users (username,userid,userpwd,birthdate,sex) VALUES('${userName}','${userId}','${userPwd}','${birthDate}','${sex}')`;
        const result = await pool.execute(sql,)
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Error is while creating user');
    }
}

const getOneUser = async (userId) => {
    try {
        const sql = `SELECT * from Users WHERE userid = '${userId}'`;
        const result = await pool.execute(sql);
        return result[0];
    } catch (error) {
        throw new Error('Error is while finding by userId');
    }
}

const updateUser = async (userId, password) => {
    try {
        const sql = `UPDATE Users SET userpwd = ${password} WHERE userid ='${userId}'`
        const result = await pool.execute(sql);
        return result[0];
    } catch (error) {
        throw new Error('Error is while updating user');
    }
}

const deleteUser = async (userId) => {
    try {
        const sql = `DELETE FROM Users WHERE userid ='${userId}'`
        const result = await pool.execute(sql);
        return result[0];
    } catch (error) {
        console.log(error);
        throw new Error('Error is while deleting userInfo');
    }
}
module.exports = { getUsers, createUser, getOneUser, updateUser, deleteUser };