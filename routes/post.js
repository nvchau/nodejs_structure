'use strict'
const express = require('express')
const router = express.Router()
const PostController = require('../src/controllers/PostController')
const postController = new PostController()
const AuthMiddleware = require('../src/middleware/AuthMiddleware')
const authMiddleware = new AuthMiddleware()
const validatorHelper = require('../src/helpers/ValidatorHelper')
const createPostValidator = require('../src/validators/Post/createPostValidator')
const updatePostValidator = require('../src/validators/Post/updatePostValidator')
const createCommentValidator = require('../src/validators/Comment/createCommentValidator')
const updateCommentValidator = require('../src/validators/Comment/updateCommentValidtor')

// get all posts
router.get('/', postController.posts) 

// add new post
router.post('/', createPostValidator, validatorHelper, (req, res, next) => {
    authMiddleware.isAuth(req, res, next)
}, postController.create) 

// get post detail
router.get('/:id', postController.detail) 

// update a post
router.put('/:id', updatePostValidator, validatorHelper, (req, res, next) => {
    authMiddleware.isAuth(req, res, next)
}, postController.update)

// delete a post
router.delete('/:id', (req, res, next) => {
    authMiddleware.isAuth(req, res, next)
}, postController.delete)

// like a post
router.post('/:id/like', (req, res, next) => {
    authMiddleware.isAuth(req, res, next)
}, postController.like) 

// get all comments of a post
router.get('/:id/comments', postController.comments) 

// Tất cả router phía dưới đều dùng middleware này 
// router.use(validatorHelper)

// add a new comment to the post
router.post('/:id/comments', createCommentValidator, validatorHelper, (req, res, next) => {
    authMiddleware.isAuth(req, res, next)
}, postController.createComment) 

// get comment details of a post
router.get('/:id/comments/:commentId', postController.commentDetail) 

// update comment
router.put('/:id/comments/:commentId', updateCommentValidator, validatorHelper, (req, res, next) => {
    authMiddleware.isAuth(req, res, next)
}, postController.updateComment) 

// delete comment
router.delete('/:id/comments/:commentId', (req, res, next) => {
    authMiddleware.isAuth(req, res, next)
}, postController.deleteComment) 

// like a comment of a post
router.post('/:id/comments/:commentId/like', (req, res, next) => {
    authMiddleware.isAuth(req, res, next)
}, postController.likeComment) 

module.exports = router
