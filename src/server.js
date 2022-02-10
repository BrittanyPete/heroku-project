const express = require('express');
const Users = require('./user-model');
const server = express();

server.use(express.json());

server.use('*', (req, res) => {
    res.send('<h1>Hello World!</h1>')
});

server.get('/api/users', (req, res) => {
    Users.findAll()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({
            message: 'could not find users'
        })
    })
});

server.post('/api/register', (req, res) => {
    console.log('req body:', req.body)
    const { body } = req;
    if (!body.username || !body.password) {
        res.status(400).json({
            message: 'Both username and password are required'
        })
    } else {
        Users.create(body)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json({
                message: 'could not create new user',
                err: err.message
            })
        })
    }

})


module.exports = server;