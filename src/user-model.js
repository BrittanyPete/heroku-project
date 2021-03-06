const { nanoid } = require('nanoid');

function getId() {
    return nanoid().slice(0, 5)
}

let users = [
    { id: getId(), username: 'frodo', password: '1234' },
    { id: getId(), username: 'sam', password: '9876' },
    { id: getId(), username: 'bilbo', password: 'frodo' },
]

module.exports = {

async findAll() {
    return Promise.resolve(users);
},

async create({ username, password }) {
    const newUser = { id: getId(), username, password }
    users.push(newUser)
    return Promise.resolve(newUser)
},

async findUser(username) {
    const user = users.findAll(u => u.username === username)
    return Promise.resolve(user)
}

}
