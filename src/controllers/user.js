const { readUser, createUser, updateUser, deleteUser, readUsers } = require("../logic").userLogic

/**
 * POST /api/v1/user
 */
const createUserController = async (req, res, next) => {
    try {
        const { username, password, dob } = req.body
        const user = await createUser({username, password, dob})
        req.session.user = user
        return res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

/**
 * GET /api/v1/user || /api/v1/user/:id
 */
const readUserController = async (req, res, next) => {
    try {
        if (req.params.id) 
            return res.json(await readUser(req.params.id))

        return res.json(await readUser(req.session.user.id))
    } catch (error) {
        next(error)
    }
}

/**
 * GET /api/v1/user/all
 */
const readUsersController = async (req, res, next) => {
    try {
        const users = await readUsers()
        res.json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    readUserController, readUsersController, createUserController
}