'use strict'

// dữ liệu tạm
const users = [
    {
        id: 1,
        email: 'chaunv@bap.jp',
        password: '123456789',
        role: 2,
    },
    {
        id: 2,
        email: 'daulq@bap.jp',
        password: '123456789',
        role: 1,
    },
    {
        id: 3,
        email: 'longpv@bap.jp',
        password: '123456789',
        role: 1,
    }
]

class UserRepository {
    getUserByEmail({ email }) {
        return users.find(user => user.email === email)
    }

    create({ dataInsert }) {
        dataInsert.id = users.length + 1;
        users.push(dataInsert)

        return dataInsert
    }
}

module.exports = UserRepository
