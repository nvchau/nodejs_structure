'use strict'
const { body } = require('express-validator')

module.exports = [
    body('email').notEmpty().withMessage('email_is_required'),
    body('email').isEmail().withMessage('email_invalidate'),
    body('password').notEmpty().withMessage('password_is_required'),
    body('password').isLength({ min: 8 }).withMessage('password_at_least_8_characters'),
    body('name').notEmpty().withMessage('name_is_required'),
    body('age').notEmpty().withMessage('age_is_required'),
    body('age').isNumeric().withMessage('age_must_be_number'),
]