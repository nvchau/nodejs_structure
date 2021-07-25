'use strict'
const UserRepository = require('../repositories/UserRepository')
const JwtHelper = require("../helpers/JwtHelper")
require("dotenv").config()

class AuthService {
    constructor() {
        this.userRepo = new UserRepository()
        this.jwtHelper = new JwtHelper()
    }

    // tham số nhận theo kiểu {} object để không cần quan tâm đến tham số đầu vào
    // {password, email} vẫn nhận đúng giá trị của 2 phần tử
    async register({ email, password }) {
        let user = await this.userRepo.getUserByEmail({ email })

        if(user) {
            return {
                status: 400,
                error: 1,
                message: 'user_is_existed',
                data: null
            }
        }

        const dataInsert = {
            email,
            password
        }

        user = await this.userRepo.create({ dataInsert })

        // payload chỉ nên có 2-3 thông tin thôi
        const payload = {
            id: user.id,
            role: 1, // vd: 1 là normal user
            timestamp: new Date().getTime()
            // sử dụng timestamp để mỗi lần lấy token sẽ khác nhau, vì timestamp luôn thay đổi theo thời gian
        }

        // Generate token (npm install json-web-token)
        const token = await JWT.encode('chaunv', payload)

        return {
            status: 201,
            error: 0,
            message: 'success',
            data: {
                user,
                token: token.value
            }
        }
    }

    async login({ email, password }) {
        const user = this.userRepo.getUserByEmail({ email })

        if(!user) {
            return {
                status: 400,
                error: 1,
                message: 'user_not_found',
                data: null
            }
        }

        if(password !== user.password) {
            return {
                status: 400,
                error: 1,
                message: 'password_wrong',
                data: null
            }
        }
        //NÊN LƯU VÀO .ENV
        // Thời gian sống của token
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1h'
        // Mã secretKey này phải được bảo mật tuyệt đối
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret-chaunv'
        // Thời gian sống của refreshToken
        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '3650d';
        // Mã secretKey này phải được bảo mật tuyệt đối
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret-chaunv'

        const accessToken = this.jwtHelper.generateToken({ 
            user, 
            secretSignature: accessTokenSecret, 
            tokenLife: accessTokenLife 
        })
        // const refreshToken = this.jwtHelper.generateToken({ 
        //     user, 
        //     secretSignature: refreshTokenSecret, 
        //     tokenLife: refreshTokenLife 
        // })

        return {
            status: 201,
            error: 0,
            message: 'success',
            data: {
                user,
                token: accessToken
            }
        }
    }
}

module.exports = AuthService
