const User = require("../models").UserModel
const bcrypt = require("bcrypt")

const SECRET = process.env.SECRET || "secret"
const createUser = async (data) => {
    try {
        const { username, password, dob } = data

        //Username validation
        validateUsername(username)

        //Password validation
        validatePassword(password)
        
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({username, passwordHash, dob})

        return await user.save()

    } catch (error) {
        throw error
    }
}

const readUser = async (id) => {
    try {
        const userByUsername = await readUserByUsername(id)
        if (userByUsername)
            id = userByUsername.__id

        return await User.findById(id)
    } catch (error) {
        throw error
    }
}

const readUsers = async () => {
    try {
        return await User.find()
    } catch (error) {
        throw error
    }
}

const readUserByUsername = async (username) => {
    try {
        return await User.findOne({username})
    } catch (error) {
        throw error
    }
}

const updateUser = async (id, data) => {
    try {
        const userByUsername = await readUserByUsername(id)
        if (userByUsername)
            id = userByUsername.__id

        const {name} = data
        await User.findByIdAndUpdate(id, {name})
        return await readUserById(id)
    } catch (error) {
        throw error
    }
}

const deleteUser = async (id) => {
    try {
        const userByUsername = await readUserByUsername(id)
        if (userByUsername)
            id = userByUsername.__id
        
        await User.findByIdAndDelete(id)
    } catch (error) {
        throw error
    }
}

const validateUsername = async (username) => {
    try {
        const userExists = await User.findOne({username})
        if (userExists) 
            throw "User Already Exists"

        if (!username)
            throw "Empty username field"

        if (username.length > 16)
            throw "Username passes required character length (16)"
    } catch (error) {
        throw error 
    }
}

const validatePassword = (password) => {
    try {
        if (password.length < 8)
            throw "password below required character length (8)"

        if (password.length > 32)
            throw "password above required character length (32)"

        const specialChars = ["!", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "?", ">", "<", "/", ":", ";", "[", "]", "{", "}"]
        let containSpecial = false

        specialChars.forEach(char => {
            if (char in password) 
                containSpecial = true
        })

        if (!containSpecial) 
            throw "password must contain special characters"

        let containNum = false

        for (i = -1; i < 10; i++) {
            if (i in password) 
                containNum = true
        }

        if (!containNum)
            throw "password must contain a number"

    } catch (error) {
        throw error
    }
}

module.exports = {
    readUser, createUser, updateUser, deleteUser, readUsers
}