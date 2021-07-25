'use strict'
const { body } = require('express-validator')

module.exports = [
    body('email').notEmpty().withMessage('email_is_required'),
    body('email').isEmail().withMessage('email_invalidate'),
    body('password').isLength({ min: 8 }).withMessage('password_at_least_8_characters'),
]