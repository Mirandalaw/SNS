const pool = require('./db');

module.exports = {
    createPostDislikeSchema: async () => {
        const sql = `CREATE table postdislike (
            post_dislike_uuid varchar(36) NOT NULL COMMENT '댓글 좋아요 or 싫어요 UUID',
            post_dislike_status tinyint(2) NOT NULL DEFAULT 0 COMMENT 'Like or None',
            user_uuid varchar(36) NOT NULL COMMENT '유저 UUID',
            post_uuid varchar(36) NOT NULL COMMENT '포스트 UUID',
            PRIMARY KEY(post_dislike_uuid)
        )`;
        const result = await pool.execute(sql);
        return result;
    },

    createPostDislike: async (post_dislike_uuid, user_uuid, post_uuid, body) => {
        const sql = `INSERT INTO postdislike(post_dislike_uuid,post_dislike_status,user_uuid,post_uuid) VALUES('${post_dislike_uuid}',${body.post_dislike_status},'${user_uuid}','${post_uuid}')`;
        const result = await pool.execute(sql);
        return result;
    },

    getAllPostDislike: async () => {
        const sql = `SELECT * FROM postdislike`;
        const result = await pool.execute(sql);
        return result[0];
    },

    getOnePostDislike: async (post_dislike_uuid) => {
        const sql = `SELECT * FROM postdislike WHERE post_dislike_uuid ='${post_dislike_uuid}'`;
        const result = await pool.execute(sql);
        return result[0];
    },

    updatePostDislike: async (post_dislike_uuid, body) => {
        const sql = `UPDATE postdislike SET post_dislike_status = ${body.post_dislike_status} WHERE post_dislike_uuid = '${post_dislike_uuid}'`;
        const result = await pool.execute(sql);
        return result[0];
    },

    deletePostDislike: async (post_dislike_uuid) => {
        const sql = `DELETE FROM postdislike WHERE post_dislike_uuid = '${post_dislike_uuid}'`
        const result = await pool.execute(sql);
        return result[0];
    }

}