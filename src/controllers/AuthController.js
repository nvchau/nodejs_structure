'use strict'
const AuthService = require('../services/AuthService')

class AuthController {
    constructor() {
        this.authService = new AuthService()
    }

    async register(req, res, next) {
        const { email, password } = req.body

        // console với {} object để tường minh key-value
        // console.log({ email, password })

        // tham số nhận theo kiểu {} object để không cần quan tâm đến tham số đầu vào
        // {password, email} vẫn nhận đúng giá trị của 2 phần tử (không cần quan tâm thứ tự tham số truyền vào)
        const response = await this.authService.register({ email, password })

        return res.status(response.status).json(response)
    }

    async login(req, res, next) {
        const { email, password } = req.body

        const response = await this.authService.login({ email, password })

        return res.status(response.status).json(response)
    }
}

module.exports = AuthController
