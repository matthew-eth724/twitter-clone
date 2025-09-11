const passport = require("passport")
const { Strategy } = require("passport-local")
const { readUser } = require("../logic/").userLogic
const bcrypt = require("bcrypt")

const localStrategy = passport.use(new Strategy(async (username, password, done) => {
    try {
        const user = await readUser(username)
        const isPassword = await bcrypt.compare(password, user.passwordHash)

        if (!isPassword || !user)
            throw "BAD CREDENTIALS"

        done(null, user)
    } catch (error) {
        done(error, null)
    }
}))

module.exports == localStrategy