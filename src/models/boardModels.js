const pool = require('./db');

module.exports = {

    findById: async (board_id) => {
        const sql = `SELECT * FROM BOARD WHERE BOARD_ID = ${board_id}`;
        const result = await pool(sql);
        return result[0];
    },
    findAll: async () => {
        const sql = `SELECT * FROM BOARD`
        const result = await pool(sql);
    }
}