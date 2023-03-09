const pool = require('./db');

module.exports = {

    getUsers: async () => {
        const sql = 'SELECT * FROM user';
        const result = await pool.execute(sql);
        return result[0];
    },

    getOneUser: async (userId) => {
        const sql = `SELECT * from user WHERE user_id = '${userId}'`;
        const result = await pool.execute(sql);
        return result[0];
    },

    createUserSchema: async () => {
        const sql =
            `CREATE TABLE user (
                user_uuid varchar(36) NOT NULL COMMENT '유저 UUID',
                user_id varchar(50) NOT NULL COMMENT '유저 ID',
                login_type tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:id-pw, 1:social login',
                user_status tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: 회원, 1:탈퇴회원, 2: 휴면회원, 3: 정지회원',
                nickname varchar(50) NOT NULL COMMENT '닉네임',
                user_name varchar(30) NOT NULL DEFAULT '' COMMENT '이름',
                image_url varchar(100) NOT NULL COMMENT '프로필 사진 URL',
                register_datetime datetime NOT NULL COMMENT '가입일자',
                register_ip varchar(30) NOT NULL COMMENT '가입IP',
                update_datetime datetime NOT NULL COMMENT '정보수정 일자',
                update_ip varchar(30) NOT NULL COMMENT '정보수정 IP',
                gether_agree tinyint(4) NOT NULL DEFAULT '0' COMMENT '개인정보 수집동의 0:거절, 1:승인',
                cell_phone varchar(30) NOT NULL COMMENT '휴대폰 번호',
                email varchar(50) NOT NULL COMMENT '이메일',
                birthday varchar(8) NOT NULL COMMENT '생년월일',
                sex tinyint(4) NOT NULL COMMENT '0;남자, 1:여자',
                cell_phone_auth tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:미인증, 1:인증',
                cell_phone_auth_date datetime DEFAULT NULL COMMENT '휴대폰 인증 일자',
                salt varchar(128) NOT NULL COMMENT '솔트값',
                password varchar(128) NOT NULL COMMENT '패스워드(SHA 512)',
                pw_update_time datetime NOT NULL COMMENT '비밀번호 변경일',
                pw_update_ip varchar(30) NOT NULL DEFAULT '' COMMENT '비밀번호 변경 IP',
                PRIMARY KEY (user_uuid),
                UNIQUE KEY user_id (user_id)
              )`;
        const result = await pool.execute(sql,)
        return result;
    },

    createUser: async (user_uuid, current_ip, salt, hashedPassword, body) => {
        const sql = `INSERT INTO user(user_uuid,user_id,login_type,user_status,nickname,user_name,image_url,register_datetime,register_ip,update_datetime,update_ip,gether_agree,cell_phone,email,birthday,sex,cell_phone_auth,cell_phone_auth_date,salt,password,pw_update_time,pw_update_ip) 
            VALUES('${user_uuid}','${body.user_id}',0,0,'${body.nickname}','${body.user_name}','0',(now()),'${current_ip}',(now()),'${current_ip}',0,'${body.cell_phone}','${body.email}','${body.birthday}',${body.sex},0,(now()),'${salt}','${hashedPassword}',(now()),'${current_ip}')`;
        const result = await pool.execute(sql);
        return result;
    },

    updateUser: async (userId, password) => {
        const sql = `UPDATE user SET password= ${password} WHERE user_id ='${userId}'`
        const result = await pool.execute(sql);
        return result[0];
    },

    deleteUser: async (userId) => {
        const sql = `DELETE FROM user WHERE user_id ='${userId}'`
        const result = await pool.execute(sql);
        return result[0];

    }
}