'use strict'
const PostService = require('../services/PostService')

class PostController {
    constructor() {
        this.postService = new PostService()
    }

    posts = async (req, res, next) => {
        const response = await this.postService.getAll()

        return res.status(response.status).json(response)
    }
    
    create = async (req, res, next) => {
        const { decoded } = req.jwtDecoded
        const { title, content } = req.body

        const response = await this.postService.create({ title, content, authorId: decoded.data.id })

        return res.status(response.status).json(response)
    }
    
    detail = async (req, res, next) => {
        const { id } = req.params

        const response = await this.postService.detail({ id: parseInt(id) })

        return res.status(response.status).json(response)
    }
    
    update = async (req, res, next) => {
        const { id } = req.params
        const { title, content } = req.body
        const { decoded } = req.jwtDecoded

        const response = await this.postService.update({ id: parseInt(id), title, content, userId: decoded.data.id })

        return res.status(response.status).json(response)
    }
    
    delete = async (req, res, next) => {
        const { id } = req.params
        const { decoded } = req.jwtDecoded

        const response = await this.postService.delete({ id: parseInt(id), userId: decoded.data.id })

        return res.status(response.status).json(response)
    }
    
    like = async (req, res, next) => {
        const { id } = req.params
        const { decoded } = req.jwtDecoded

        const response = await this.postService.like({ id: parseInt(id), userId: decoded.data.id })

        return res.status(response.status).json(response)
    }
    
    comments = async (req, res, next) => {
        const { id } = req.params

        const response = await this.postService.getAllComments({ id: parseInt(id) })

        return res.status(response.status).json(response)
    }
    
    createComment = async (req, res, next) => {
        const { id } = req.params
        const { content }= req.body
        const { decoded } = req.jwtDecoded

        const response = await this.postService.createComment({ id: parseInt(id), content, userId: decoded.data.id })

        return res.status(response.status).json(response)
    }
    
    commentDetail = async (req, res, next) => {
        const { id, commentId } = req.params

        const response = await this.postService.commentDetail({ id: parseInt(id), commentId: parseInt(commentId) })

        return res.status(response.status).json(response)
    }
    
    updateComment = async (req, res, next) => {
        const { id, commentId } = req.params
        const { content } = req.body
        const { decoded } = req.jwtDecoded

        const response = await this.postService.updateComment({ 
            id: parseInt(id), 
            commentId: parseInt(commentId), 
            content: content,
            userId: decoded.data.id 
        })

        return res.status(response.status).json(response)
    }
    
    deleteComment = async (req, res, next) => {
        const { id, commentId } = req.params
        const { decoded } = req.jwtDecoded

        const response = await this.postService.deleteComment({ 
            id: parseInt(id), 
            commentId: parseInt(commentId), 
            userId: decoded.data.id 
        })

        return res.status(response.status).json(response)
    }
    
    likeComment = async (req, res, next) => {
        const { id, commentId } = req.params
        const { decoded } = req.jwtDecoded

        const response = await this.postService.likeComment({ 
            id: parseInt(id), 
            commentId: parseInt(commentId), 
            userId: decoded.data.id 
        })

        return res.status(response.status).json(response)
    }
}

module.exports = PostController