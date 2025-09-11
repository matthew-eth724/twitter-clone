const { readUser, createUser, updateUser, deleteUser, readUsers } = require("../logic").userLogic
const bcrypt = require("bcrypt")
const { responseBody } = require("../utils").response

/**
 * POST /api/v1/user
 */
const createUserController = async (req, res, next) => {
    try {
        const { username, password} = req.body
        const user = await createUser({username, password})
        req.session.user = user
        res.cookie("id", user._id, {maxAge: 60000 * 60 * 24 * 14})
        //console.log(req.session)
        return responseBody(res, `Welcome, ${username}`, user, 201)
    } catch (error) {
        if (error == "User Already Exists") {
            let user
            const { username, password} = req.body 
            
            if (req.session.user && req.session.user.username != username) 
                req.session.user = null

            if (req.session.user) {
                user = await readUser(req.session.user.id)
                user.sessionId = req.session.id
                //console.log("xyz1")
                //console.log(user)
            } else if (!req.session.user) {
                user = await readUser(username)
                //console.log("xyz2")
                //console.log(user)
            }
            
            user.password = await bcrypt.compare(password, user.passwordHash)

            if (user.username == username && user.password) {
                req.session.user = user
                return responseBody(res, `Welcome back @${username}`, user, 200)
                
            } else {
                console.log("error dey ooo", error)
                next(error)
            }
        }
        next(error)
    }
}

/**
 * GET /api/v1/user || /api/v1/user/:id
 */
const readUserController = async (req, res, next) => {
    try {
        if (req.params.id) 
            return responseBody(res, `User ${req.params.id} retrieved`, await readUser(req.params.id), 200)

        //console.log(req.cookies.id)
        return responseBody(res, `User ${req.session.user.id} retrieved `, await readUser(req.session.user.id), 200)
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
        return responseBody(res, `Users retrieved`, users, 200)
    } catch (error) {
        next(error)
    }
}

/**
 * PUT /api/v1/user
 */
const updateUserController = async (req, res, next) => {
    try {
        const user = await updateUser(req.session.user.id, req.body)
        return responseBody(res, "User updated", user, 200)
    } catch (error) {
        next(error)
    }
}

/**
 * DELETE /api/v1/user/
 */
const deleteUserController = async (req, res, next) => {
    try {
        await deleteUser(req.session.user.id)
        req.session.user = {}
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    readUserController, readUsersController, createUserController, updateUserController, deleteUserController
}