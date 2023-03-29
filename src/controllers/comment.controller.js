const { commentService } = require('../services');

module.exports = {
    findAllComments: async (req, res) => {
        try {
            const comments = await commentService.getAllComments();
            if (comments.length === 0) return res.status(404).send({ statusCode: 404, msg: "Comments were not found" });
            return res.status(200).send({ data: comments, statusCode: 200, msg: "Find all comments" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, error: error.message });
        }
    },

    findOneCommentById: async (req, res) => {
        try {
            const comment = await commentService.getOneComment(req);
            if (comment.length === 0) return res.status(404).send({ statusCode: 404, msg: "Comment was not found" });
            return res.status(200).send({ data: comment, statusCode: 200, msg: "Find a comment by Id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },
    createComment: async (req, res) => {
        try {
            const comment = await commentService.createComment(req);
            return res.status(201).send({ statusCode: 201, msg: "Succcess to create a comment" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    }
    ,
    deleteCommentById: async (req, res) => {
        try {
            const comment = await commentService.deleteComment(req);
            if (comment.length === 0) return res.status(404).send({ statusCode: 404, msg: "Comment was not found" });
            return res.status(201).send({ statusCode: 201, msg: "Success to delete a comment by Id" })
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    },
    updateCommentById: async (req, res) => {
        try {
            const comment = await commentService.updateContent(req);
            return res.status(201).send({ statusCode: 201, msg: "Success to update a comment by Id" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ statusCode: 500, msg: "Server Error" });
        }
    }
}