const postModels = require('../models/postModels');
const { createUUID } = require('../utils/uuidUtil');

module.exports = {

    getAllPosts: async () => {
        try {
            // await postModels.createPostSchema();
            const posts = await postModels.getAllPosts();
            return posts;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding all posts');
        }
    },

    getOnePost: async (data) => {
        try {
            const post = await postModels.getOnePost(data);
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error while finding a post by postId');
        }
    },
    createPost: async (reqData) => {
        try {
            const post_uuid = createUUID();
            const current_ip = reqData.ip;
            const { user_uuid } = reqData.query;
            const post = await postModels.createPost(post_uuid, user_uuid, current_ip, reqData.body);
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating a post');
        };
    },

    deletePost: async (reqData) => {
        try {
            const { post_id } = reqData.query;
            const post = await postModels.deletePost(post_id);
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating a post');
        }
    },
    updateTitle: async (reqData) => {
        try {
            const { post_id } = reqData.query;
            const current_ip = reqData.ip;
            const columName = "post_title"
            const columValue = reqData.body.post_title;
            const post = await postModels.updatePost(post_id, current_ip, columName, columValue);
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating a post');
        }
    },

    updateContent: async (reqData) => {
        try {
            const { post_id } = reqData.query;
            const current_ip = reqData.ip;
            const columName = "post_content";
            const columValue = reqData.body.post_content;
            const post = await postModels.updatePost(post_id, current_ip, columName, columValue);
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating a post');
        }
    },

    updateImgUrl: async (reqData) => {
        try {
            const { post_id } = reqData.query;
            const current_ip = reqData.ip;
            const columName = "image_url";
            const columValue = reqData.body.image_url;
            const post = await postModels.updatePost(post_id, current_ip, columName, columValue);
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error while creating a post');
        }
    }
}