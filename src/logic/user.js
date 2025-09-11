const User = require("../models").UserModel
const bcrypt = require("bcrypt")

const SECRET = process.env.SECRET || "secret"
const createUser = async (data) => {
    try {
        const { username, password} = data

        //Username validation
        await validateUsername(username)

        //Password validation
        validatePassword(password)
        
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({username, passwordHash})

        return await user.save()

    } catch (error) {
        console.log({
            error: error,
            where: "User Creation"
        })
        throw error
    }
}

const readUser = async (id) => {
    try {
        const userByUsername = await readUserByUsername(id)
        if (userByUsername)
            return userByUsername

        return await User.findById(id)
    } catch (error) {
        console.log({
            error: error,
            where: "User Retrieval"
        })
        throw error
    }
}

const readUsers = async () => {
    try {
        return await User.find()
    } catch (error) {
        console.log({
            error: error,
            where: "Users Retrieval"
        })
        throw error
    }
}

const readUserByUsername = async (username) => {
    try {
        return await User.findOne({username: username})
    } catch (error) {
        throw error
    }
}

const updateUser = async (id, data) => {
    try {
        const userByUsername = await readUserByUsername(id)
        if (userByUsername)
            id = userByUsername.__id

        const {name, bio} = data
        await User.findByIdAndUpdate(id, {name, bio})
        return await readUser(id)
    } catch (error) {
        console.log({
            error: error,
            where: "User Update"
        })
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
        console.log({
            error: error,
            where: "User deletion"
        })
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

        if (username.length > 32)
            throw `Username passes required character length (${username.length})`
    } catch (error) {
        console.log({
            error: error,
            where: "Username Validation"
        })
        throw error 
    }
}

const validatePassword = (password) => {
    try {
        if (password.length < 8)
            throw "password below required character length (8)"

        if (password.length > 32)
            throw "password above required character length (32)"

        const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "?", ">", "<", "/", ":", ";", "[", "]", "{", "}"]
        let containSpecial = false
        const pword = password.split("")

        for (i = 0; i < specialChars.length; i++) {
            console.log(`Test1- password contains special character: ${containSpecial} char: ${specialChars[i]}, ${i}`)
            
            for (x = 0; x < pword.length; x++) {
                console.log(x, i)
                if (pword[x] == specialChars[i]){
                    containSpecial = true
                    console.log(`Test2- password contains special character: ${containSpecial} char: ${specialChars[i]}, char: ${pword[i]} ${i}`)
                }
            }
            console.log("fail")
        }

        if (!containSpecial) {
            console.log(`Test3- password contains special character: ${containSpecial}`)
            throw "password must contain special characters"
        }

        let containNum = false

        for (i = 0; i < 10; i++) {
            for (x = 0; x < pword.length; x++) {
                if (i == pword[x]) {
                    containNum = true
                }
            }
        }

        if (!containNum)
            throw "password must contain a number"

        console.log(`password contains number: ${containNum}`)
        console.log(`password contains special character: ${containSpecial}`)
    } catch (error) {
        console.log({
            error: error,
            where: "Password Validation"
        })
        throw error
    }
}

module.exports = {
    readUser, createUser, updateUser, deleteUser, readUsers
}