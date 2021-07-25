'use strict'
const JwtHelper = require("../helpers/JwtHelper")

class AuthMiddleware {
    constructor() {
        this.jwtHelper = new JwtHelper()
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret-chaunv'
    }

    async isAuth(req, res, next) {
        const tokenFromClient = await req.headers.authorization

        if (!tokenFromClient) {
            return res.status(403).json({
                status: 403,
                error: 2,
                message: 'no_token_provided',
                data: null
            })
        }

        try {
            // Thực hiện giải mã token xem có hợp lệ hay không
            const decoded = this.jwtHelper.verifyToken({
                token: tokenFromClient,
                secretKey: this.accessTokenSecret
            })

            // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau
            req.jwtDecoded = { decoded }
            // Cho phép req đi tiếp sang controller

            // TODO: Kiểm tra user trong db trước khi next qua controller

            next()
        } catch (error) {
            return res.status(401).json({
                status: 401,
                error: error,
                message: 'unauthorized',
                data: null
            })
        }
    }
}

module.exports = AuthMiddleware