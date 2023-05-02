const express = require("express");
const { registerUser, login, logout } = require("../controller/user.controller");
const app = express()
const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", login)
userRouter.get("/logout", logout)


module.exports = userRouter