const commentDislikeModels = require('../models/comment.dislikeModels');
const { createUUID } = require('../utils/uuidUtil');

module.exports = {
    getAllCommentDislike: async () => {
        try {
            // await commentDislikeModels.createCommentDislikeSchema();
            const commentDislikes = await commentDislikeModels.getAllCommentDislike();
            return commentDislikes;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding all commentDislikes');
        }
    },

    getOneCommentDislike: async (reqData) => {
        try {
            const { comment_dislike_uuid } = reqData.query;
            const commentDislike = await commentDislikeModels.getOneCommentDislike(comment_dislike_uuid);
            return commentDislike;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding a commentDislike by commentId');
        }
    },

    createCommentDislike: async (reqData) => {
        try {
            const comment_dislike_uuid = createUUID();
            const { post_uuid } = reqData.params;
            const { user_uuid } = reqData.query;
            const body = reqData.body;
            const commentDislike = await commentDislikeModels.createCommentDislike(comment_dislike_uuid, user_uuid, post_uuid, body);
            return commentDislike;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating a commentDislike');
        };
    },

    deleteCommentDislike: async (reqData) => {
        try {
            const { comment_dislike_uuid } = reqData.query;
            const commentDislike = await commentDislikeModels.deleteCommentDislike(comment_dislike_uuid);
            return commentDislike;
        } catch (error) {
            console.log(error);
            throw new Error('Error while deleting a commentDislike');
        }
    },

    updateDislike: async (reqData) => {
        try {
            const { comment_dislike_uuid } = reqData.query;
            const commentDislike = await commentDislikeModels.updateCommentDislike(comment_dislike_uuid, reqData.body);
            return commentDislike;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating a commentDislike');
        }
    }
}