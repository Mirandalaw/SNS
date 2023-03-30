const pool = require('./db');

module.exports = {
    createCommentDislikeSchema: async () => {
        const sql = `CREATE table commentdislike (
            comment_dislike_uuid varchar(36) NOT NULL COMMENT '댓글 좋아요 or 싫어요 UUID',
            comment_dislike_status tinyint(2) NOT NULL DEFAULT 0 COMMENT 'Like or None',
            user_uuid varchar(36) NOT NULL COMMENT '유저 UUID',
            post_uuid varchar(36) NOT NULL COMMENT '포스트 UUID',
            PRIMARY KEY(comment_dislike_uuid)
        )`;
        const result = await pool.execute(sql);
        return result;
    },

    createCommentDislike: async (comment_dislike_uuid, user_uuid, post_uuid, body) => {
        const sql = `INSERT INTO commentdislike(comment_dislike_uuid,comment_dislike_status,user_uuid,post_uuid) VALUES('${comment_dislike_uuid}',${body.comment_dislike_status},'${user_uuid}','${post_uuid}')`;
        const result = await pool.execute(sql);
        return result;
    },

    getAllCommentDislike: async () => {
        const sql = `SELECT * FROM commentdislike`;
        const result = await pool.execute(sql);
        return result[0];
    },

    getOneCommentDislike: async (comment_dislike_uuid) => {
        const sql = `SELECT * FROM commentdislike WHERE comment_dislike_uuid ='${comment_dislike_uuid}'`;
        const result = await pool.execute(sql);
        return result[0];
    },

    updateCommentDislike: async (comment_dislike_uuid, body) => {
        const sql = `UPDATE commentdislike SET comment_dislike_status = ${body.comment_dislike_status} WHERE comment_dislike_uuid = '${comment_dislike_uuid}'`;
        const result = await pool.execute(sql);
        return result[0];
    },

    deleteCommentDislike: async (comment_dislike_uuid) => {
        const sql = `DELETE FROM commentdislike WHERE comment_dislike_uuid = '${comment_dislike_uuid}'`
        const result = await pool.execute(sql);
        return result[0];
    }

}