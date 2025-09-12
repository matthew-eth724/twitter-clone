const { SECRET } = require("./config")

const sessionOptions = {
    secret: SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 * 24 *14
    }
}

module.exports = sessionOptions