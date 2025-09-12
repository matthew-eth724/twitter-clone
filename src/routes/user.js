const { Router } = require("express")
const { readUserController, readUsersController, createUserController, updateUserController, deleteUserController } = require("../controllers").userController
const passport = require("passport")
const { localStrategy } = require("../strategies")
const authMiddleware = require("../middleware").auth

const router = Router()

router.get("/", authMiddleware, readUserController)

router.get("/:id", (req, res, next) => {
    if (req.params.id == "all")
        readUsersController(req, res, next)
    else 
        readUserController(req, res, next)
})

router.get("/all", readUsersController)

router.post("/", createUserController)

router.put("/", authMiddleware, updateUserController)

router.delete("/", authMiddleware, deleteUserController)

module.exports = router