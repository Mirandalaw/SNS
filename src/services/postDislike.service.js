const postDislikeModels = require('../models/post.dislikeModels');
const { createUUID } = require('../utils/uuidUtil');

module.exports = {
    getAllPostDislike: async () => {
        try {
            // await postDislikeModels.createPostDislikeSchema();
            const postDislikes = await postDislikeModels.getAllPostDislike();
            return postDislikes;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding all postDislikes');
        }
    },

    getOnePostDislike: async (reqData) => {
        try {
            const { post_dislike_uuid } = reqData.query;
            const postDislike = await postDislikeModels.getOnePostDislike(post_dislike_uuid);
            return postDislike;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding a postDislike by postId');
        }
    },

    createPostDislike: async (reqData) => {
        try {
            const post_dislike_uuid = createUUID();
            const { post_uuid } = reqData.params;
            const { user_uuid } = reqData.query;
            const body = reqData.body;
            const postDislike = await postDislikeModels.createPostDislike(post_dislike_uuid, user_uuid, post_uuid, body);
            return postDislike;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating a postDislike');
        };
    },

    deletePostDislike: async (reqData) => {
        try {
            const { post_dislike_uuid } = reqData.query;
            const postDislike = await postDislikeModels.deletePostDislike(post_dislike_uuid);
            return postDislike;
        } catch (error) {
            console.log(error);
            throw new Error('Error while deleting a postDislike');
        }
    },

    updateDislike: async (reqData) => {
        try {
            const { post_dislike_uuid } = reqData.query;
            const postDislike = await postDislikeModels.updatePostDislike(post_dislike_uuid, reqData.body);
            return postDislike;
        } catch (error) {
            console.log(error);
            throw new Error('Error while updating a postDislike');
        }
    }
}