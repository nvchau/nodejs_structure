'use strict'
const jwt = require("jsonwebtoken")

class JwtHelper {
    generateToken ({ user, secretSignature, tokenLife }) {
        // Định nghĩa những thông tin muốn lưu vào token của user
        try {
            // Payload
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
                timestamp: new Date().getTime(),
            }
    
            // Thực hiện ký và tạo token
            const accessToken = jwt.sign(
                { data: payload },
                secretSignature,
                // {
                //     algorithm: 'HS256',
                //     expiresIn: tokenLife,
                // }
            )
    
            return accessToken
        } catch (e) {
            console.log(e)
        }
    }

    verifyToken ({ token, secretKey }) {
        const decoded = jwt.verify(token, secretKey)

        return decoded
    }
}

module.exports = JwtHelper
