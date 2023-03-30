const { commentDislikeService } = require('../services');

module.exports = {
    findAllCommentDislikes: async (req, res) => {
        try {
            const commentDislikes = await commentDislikeService.getAllCommentDislike();
            if (commentDislikes.length === 0) return res.status(404).send({ statusCode: 404, msg: "CommentDislikes were not found" });
            return res.status(200).send({ data: commentDislikes, statusCode: 200, msg: "Find all commentDislikes" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },

    findOneCommentDislikeById: async (req, res) => {
        try {
            const commentDislike = await commentDislikeService.getOneCommentDislike(req);
            if (commentDislike.length === 0) return res.status(404).send({ statusCode: 404, msg: "CommentDislike was not found" });
            return res.status(200).send({ data: commentDislike, statusCode: 200, msg: "Find a commentDislike by Id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },
    createCommentDislike: async (req, res) => {
        try {
            const commentDislike = await commentDislikeService.createCommentDislike(req);
            return res.status(201).send({ statusCode: 201, msg: "Succcess to create a commentDislike" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    }
    ,
    deleteCommentDislikeById: async (req, res) => {
        try {
            const commentDislike = await commentDislikeService.deleteCommentDislike(req);
            if (commentDislike.length === 0) return res.status(404).send({ statusCode: 404, msg: "CommentDislike was not found" });
            return res.status(201).send({ statusCode: 201, msg: "Success to delete a commentDislike by Id" })
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },
    updateCommentDislikeById: async (req, res) => {
        try {
            const commentDislike = await commentDislikeService.updateDislike(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update a commentDislike by Id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    }
}