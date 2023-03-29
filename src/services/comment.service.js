const commentModels = require('../models/commentModels');
const { createUUID } = require('../utils/uuidUtil');

module.exports = {
    getAllComments: async () => {
        try {
            // await commentModels.createCommentSchema();
            const comments = await commentModels.getAllComments();
            return comments;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding all comments');
        }
    },

    getOneComment: async (reqData) => {
        try {
            const { comment_uuid } = reqData.query;
            const comment = await commentModels.getOneComment(comment_uuid);
            return comment;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding a comment by commentId');
        }
    },

    createComment: async (reqData) => {
        try {
            const comment_uuid = createUUID();
            const current_ip = reqData.ip;
            const { post_uuid } = reqData.params;
            const { user_uuid } = reqData.query;
            const body = reqData.body;
            const comment = await commentModels.createComment(comment_uuid, user_uuid, post_uuid, current_ip, body);
            return comment;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating a comment');
        };
    },

    deleteComment: async (reqData) => {
        try {
            const { comment_uuid } = reqData.query;
            const comment = await commentModels.deleteComment(comment_uuid);
            return comment;
        } catch (error) {
            console.log(error);
            throw new Error('Error while deleting a comment');
        }
    },

    updateContent: async (reqData) => {
        try {
            const { comment_uuid } = reqData.query;
            const current_ip = reqData.ip;
            const columName = "comment_content";
            const columValue = reqData.body.comment_content;
            const comment = await commentModels.updateComment(comment_uuid, current_ip, columName, columValue);
            return comment;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating a comment');
        }
    }
}