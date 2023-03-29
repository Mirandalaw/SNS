const postService = require('../services/post.service');

module.exports = {
    findAllPosts: async (req, res) => {
        try {
            const posts = await postService.getAllPosts();
            if (posts.length === 0) return res.status(404).send({ statusCode: 404, msg: "Posts were not found" });
            return res.status(200).send({ data: posts, statusCode: 200, msg: "Find all posts" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },

    findOnePostById: async (req, res) => {
        try {
            const post = await postService.getOnePost(req);
            if (post.length === 0) return res.status(404).send({ statusCode: 404, msg: "Post was not found" });
            return res.status(200).send({ data: post, statusCode: 200, msg: "Find a post by id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },
    createPost: async (req, res) => {
        try {
            const post = await postService.createPost(req);
            return res.status(201).send({ statusCode: 201, msg: "Succcess to create a post" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    }
    ,
    deletePostById: async (req, res) => {
        try {
            const post = await postService.deletePost(req);
            if (post.length === 0) return res.status(404).send({ statusCode: 404, msg: "Post was not found" });
            return res.status(201).send({ statusCode: 201, msg: "Success to delete a post by id" })
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },

    updateTitleById: async (req, res) => {
        try {
            const post = await postService.updateTitle(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update a title by id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },
    updateContetById: async (req, res) => {
        try {
            const post = await postService.updateContent(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update content by id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },
    updateImgUrlById: async (req, res) => {
        try {
            const post = await postService.updateImgUrl(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update image_url by id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    }
}