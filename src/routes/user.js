const { Router } = require("express")
const { readUserController, readUsersController, createUserController, updateUserController, deleteUserController } = require("../controllers").userController
const passport = require("passport")
const { localStrategy } = require("../strategies")
const authMiddleware = require("../middleware").auth

const router = Router()

module.exports = router