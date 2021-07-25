'use strict'
const express = require("express")
const router = express.Router()
const AuthController = require('../src/controllers/AuthController')
const authController = new AuthController()
const validatorHelper = require('../src/helpers/ValidatorHelper')
const loginValidator = require('../src/validators/Authentication/loginValidator')
const registerValidator = require('../src/validators/Authentication/registerValidator')

router.post('/register', registerValidator, validatorHelper, (req, res, next) => {
    authController.register(req, res, next)
})

router.post('/login', loginValidator, validatorHelper, (req, res, next) => {
    authController.login(req, res, next)
})

module.exports = router
