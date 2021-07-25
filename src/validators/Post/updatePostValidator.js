'use strict'
const { body, param } = require('express-validator')

module.exports = [
    param('id').notEmpty().withMessage('id_is_required'),
    param('id').isNumeric().withMessage('id_must_be_number'),
    body('title').notEmpty().withMessage('title_is_required'),
    body('title').isLength({ min: 10 }).withMessage('title_at_least_10_characters'),
    body('content').notEmpty().withMessage('content_is_required'),
    body('content').isLength({ min: 20 }).withMessage('content_at_least_20_characters'),
]
