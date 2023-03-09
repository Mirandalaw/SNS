const { verifyPassword } = require('../utils/crytoUtil');

module.exports = {

    login: async (user, body) => {
        try {
            const { user_pwd } = body;
            const { salt, password } = user[0];
            if (user) {
                const verified = await verifyPassword(user_pwd, salt, password);
                if (!verified) return false;
                else return true;
            }
        } catch (error) {
            console.log(error);
            throw new Error('login is failed');
        }
    }
}