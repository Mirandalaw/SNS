const pool = require('./db');

module.exports = {

    getAllComments: async () => {
        const sql = 'SELECT * FROM comment';
        const result = await pool.execute(sql);
        return result[0];
    },

    getOneComment: async (comment_uuid) => {
        const sql = `SELECT * FROM comment WHERE comment_uuid = '${comment_uuid}'`;
        const result = await pool.execute(sql);
        return result[0];
    },

    createCommentSchema: async () => {
        const sql = `CREATE TABLE comment (
            comment_uuid varchar(36) NOT NULL COMMENT '댓글 UUID',
            comment_content varchar(300) NOT NULL COMMENT '댓글 내용',
            image_url varchar(100) COMMENT '댓글 사진 URL',
            comment_status tinyint(2) NOT NULL DEFAULT '0' COMMENT '0: 작성완료, 1: 임시 저장',
            user_uuid varchar(36) NOT NULL COMMENT '유저 UUID',
            post_uuid varchar(36) NOT NULL COMMENT '포스트 UUID',
            register_datetime datatime NOT NULL COMMENT '등록일자',
            register_ip varchar(30) NOT NULL COMMENT '등록 IP',
            update_datetime datatime NOT NULL COMMENT '정보수정일자',
            update_ip varchar(30) NOT NULL COMMENT '정보수정 IP',
            PRIMARY KEY(comment_uuid),
        )`
        const result = await pool.execute(sql);
        return result;
    },
    createComment: async (comment_uuid, post_uuid, user_uuid, current_ip, body) => {
        const sql = `INSERT INTO comment(comment_uuid,comment_content,image_url,comment_status,user_uuid,post_uuid,register_datetime,register_ip,update_datetime,update_ip) VALUES('${comment_uuid}','${body.comment_content}','0',0,'${user_uuid}','${post_uuid}',(now()),'${current_ip}',(now()),'${current_ip}')`;
        const result = await pool.execute(sql);
        return result;
    },
    updateComment: async (comment_uuid, current_ip, columName, columValue) => {
        const sql = `UPDATE comment SET ${columName} = '${columValue}', update_datetime = (now()),update_ip = '${current_ip}' WHERE comment_uuid = '${comment_uuid}'`
        const result = await pool.execute(sql);
        return result[0];
    }
    ,
    deleteComment: async (comment_uuid) => {
        const sql = `DELETE FROM comment WHERE comment_uuid = '${comment_uuid}'`;
        const result = await pool.execute(sql);
        return result[0];
    }

}