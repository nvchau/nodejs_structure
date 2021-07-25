'use strict'
const { body, param } =require('express-validator')

module.exports = [
    param('id').isNumeric().withMessage('id_must_be_number'),
    param('commentId').isNumeric().withMessage('commentId_must_be_number'),
    body('content').notEmpty().withMessage('title_is_required'),
]
