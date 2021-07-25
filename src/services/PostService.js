'use strict'
const PostRepository = require('../repositories/PostRepository')

class PostService {
    constructor() {
        this.postRepository = new PostRepository()
    }

    async getAll() {
        const posts = await this.postRepository.getAll()

        if (!posts) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: posts
            }
        }
    
        return {
            status: 200,
            error: 0,
            message: "success",
            data: posts
        }
    }

    async create({ title, content, authorId }) {
        try {
            const post = await this.postRepository.create({ title, content, authorId })

            return {
                status: 201,
                error: 0,
                message: "create_new_post_successful",
                data: post
            }
        } catch (error) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }
    }

    async detail({ id }) {
        const post = await this.postRepository.detail({ id })

        if (!post) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "get_post_detail_success",
            data: post
        }
    }

    async update({ id, title, content, userId }) {
        const post = await this.postRepository.update({ id, title, content, userId })

        if (!post) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "update_post_success",
            data: post
        }
    }

    async delete({ id, userId }) {
        const dele = await this.postRepository.delete({ id, userId })

        if (!dele) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "delete_post_success",
            data: {
                userId: userId
            }
        }
    }

    async like({ id, userId }) {
        const post = await this.postRepository.detail({ id })

        if (!post) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "like_post_success",
            data: {
                post: post,
                userId: userId
            }
        }
    }

    async getAllComments({ id }) {
        const comments = await this.postRepository.allCommentsByPostId({ id })

        if (!comments) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "get_all_of_post_success",
            data: comments
        }
    }

    async createComment({ id, content, userId }) {
        const comment = await this.postRepository.createComment({id, content, userId})

        if (!comment) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "add_comment_success",
            data: comment
        }
    }

    async commentDetail({ id, commentId }) {
        const comment = await this.postRepository.getOneCommentByIdAndPostId({ id, commentId })

        if (!comment) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "success",
            data: comment
        }
    }

    async updateComment({ id, commentId, content, userId }) {
        const post = await this.postRepository.updateComment({ id, commentId, content, userId })

        if (!post) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "success",
            data: {
                post,
                userId: userId
            }
        }
    }

    async deleteComment({ id, commentId, userId }) {
        const comment = await this.postRepository.deleteComment({ id, commentId, userId })

        if (!comment) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "delete_comment_success",
            data: {
                userId: userId
            }
        }
    }

    async likeComment({ id, commentId, userId }) {
        const comment = await this.postRepository.likeComment({ id, commentId })

        if (!comment) {
            return {
                status: 400,
                error: 1,
                message: "failed",
                data: null
            }
        }

        return {
            status: 200,
            error: 0,
            message: "like_comment_success",
            data: {
                userId: userId
            }
        }
    }
}

module.exports = PostService