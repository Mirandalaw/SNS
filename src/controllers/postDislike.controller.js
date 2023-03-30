const { postDislikeService } = require('../services');

module.exports = {
    findAllPostDislikes: async (req, res) => {
        try {
            const postDislikes = await postDislikeService.getAllPostDislike();
            if (postDislikes.length === 0) return res.status(404).send({ statusCode: 404, msg: "PostDislikes were not found" });
            return res.status(200).send({ data: postDislikes, statusCode: 200, msg: "Find all postDislikes" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },

    findOnePostDislikeById: async (req, res) => {
        try {
            const postDislike = await postDislikeService.getOnePostDislike(req);
            if (postDislike.length === 0) return res.status(404).send({ statusCode: 404, msg: "PostDislike was not found" });
            return res.status(200).send({ data: postDislike, statusCode: 200, msg: "Find a postDislike by Id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },
    createPostDislike: async (req, res) => {
        try {
            const postDislike = await postDislikeService.createPostDislike(req);
            return res.status(201).send({ statusCode: 201, msg: "Succcess to create a postDislike" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    }
    ,
    deletePostDislikeById: async (req, res) => {
        try {
            const postDislike = await postDislikeService.deletePostDislike(req);
            if (postDislike.length === 0) return res.status(404).send({ statusCode: 404, msg: "PostDislike was not found" });
            return res.status(201).send({ statusCode: 201, msg: "Success to delete a postDislike by Id" })
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },
    updatePostDislikeById: async (req, res) => {
        try {
            const postDislike = await postDislikeService.updateDislike(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update a postDislike by Id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    }
}