const express = require("express");
const Users = require("./user-model");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cors());

server.get("/api/users", (req, res) => {
  Users.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "could not find users",
      });
    });
});

server.post("/api/register", (req, res) => {
  const { body } = req;
  if (!body.username || !body.password) {
    res.status(400).json({
      message: "Both username and password are required",
    });
  } else {
    Users.create(body)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "could not create new user",
          err: err.message,
        });
      });
  }
});

server.post("/api/login", (req, res) => {

 if(!req.body.username || !req.body.password) {
     res.status(400).json({
         message: 'please try logging in again'
     });
 } else {
    res.json({
        message: `Welcome ${req.body.username}`
    })
 }
});

server.use("*", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

module.exports = server;
