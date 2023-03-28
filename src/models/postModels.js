const pool = require('./db');

module.exports = {

    getAllPosts: async () => {
        const sql = 'SELECT * FROM post';
        const result = await pool.execute(sql);
        return result[0];
    },

    getOnePost: async (post_uuid) => {
        const sql = `SELECT * from post WHERE post_uuid = '${post_uuid}'`;
        const result = await pool.execute(sql);
        return result[0];
    },

    createPostSchema: async () => {
        const sql =
            `CREATE TABLE post (
                post_uuid varchar(36) NOT NULL COMMENT '포스트 UUID',
                post_title varchar(100) NOT NULL COMMENT '포스트 제목',
                post_content varchar(500) NOT NULL COMMENT '포스트 내용',
                image_url varchar(100) COMMENT '포스트 사진 URL',
                post_status tinyint(2) NOT NULL DEFAULT '0' COMMENT '0: 작성완료, 1:작성중',
                user_uuid varchar(36) NOT NULL COMMENT '유저 UUID',
                register_datetime datetime NOT NULL COMMENT '등록일자',
                register_ip varchar(30) NOT NULL COMMENT '등록 IP',
                update_datetime datetime NOT NULL COMMENT '정보수정일자',
                update_ip varchar(30) NOT NULL COMMENT '정보수정 IP',
                comment_uuid varchar(36) DEFAULT NULL COMMENT '댓글 UUID',
                PRIMARY KEY (post_uuid),
                UNIQUE KEY post_id (post_id)
              )`;
        const result = await pool.execute(sql)
        return result;
    },

    createPost: async (post_uuid, user_uuid, current_ip, body) => {
        const sql = `INSERT INTO post(post_uuid,post_title,post_content,image_url,post_status,user_uuid,register_datetime,register_ip,update_datetime,update_ip,comment_uuid) VALUES('${post_uuid}','${body.post_title}','${body.post_content}','0',0,'${user_uuid}',(now()),'${current_ip}',(now()),'${current_ip}','NULL')`;
        const result = await pool.execute(sql);
        return result;
    },
    updatePost: async (post_uuid, current_ip, columName, columValue) => {
        const sql = `UPDATE post SET ${columName} = '${columValue}', update_datetime = (now()),update_ip = '${current_ip}' WHERE post_uuid = '${post_uuid}'`
        const result = await pool.execute(sql);
        return result[0];
    }
    ,
    deletePost: async (post_uuid) => {
        const sql = `DELETE FROM post WHERE post_uuid = '${post_uuid}'`;
        const result = await pool.execute(sql);
        return result[0];
    }
}