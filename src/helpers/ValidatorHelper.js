'use strict'
const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(400).json({ error: errors.array()[0].msg })
        return next({
            error: 400,
            code: 400,
            message: errors.array()[0].msg,
            date: null
        })
    }
    next()
}
