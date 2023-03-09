const util = require('util');
const crypto = require('crypto');
require('dotenv').config();

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
    /**
     * Salt Create 
     * @returns String
     */
    createSalt: async () => {
        const buf = await randomBytesPromise(64);
        return buf.toString("base64");
    },
    /**
     * Create HashedPassword
     * @param {String} password 
     * @returns String, String
     */
    createHashedPassword: async (password) => {
        const salt = await createSalt();
        const key = await pbkdf2Promise(password, salt, Number(process.env.KEY_STRETCHING), 64, "sha512");
        const hashedPassword = key.toString("base64");
        return { hashedPassword, salt };
    },
    /**
     * verifyPassword
     * @param {String} password 
     * @param {String} userSalt 
     * @param {String} userPassword 
     * @returns boolean
     */
    verifyPassword: async (password, userSalt, userPassword) => {
        const key = await pbkdf2Promise(password, userSalt, Number(process.env.KEY_STRETCHING), 64, 'sha512');
        const hashedPassword = key.toString('base64');
        if (hashedPassword === userPassword) return true;
        return false;
    }
}