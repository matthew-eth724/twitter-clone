const express = require("express")
const cors = require("cors")
const session = require("express-session")
const passport = require("passport")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const DBConnect = require("./DB")

const PORT = process.env.PORT || 3000
const SECERT = process.env.SECRET || "secret"

const app = express()

app.use(cors())
app.use(express.json())
app.use(session({
    secret: SECERT,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 * 24 *14
    }
}))
app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url} @${new Date().toISOString()}`)
    next()
})
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

try {
    DBConnect()
} catch (error) {
    console.error("DB CONNECTION ERROR", error)
}

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
    console.log(`http://localhost:${PORT}`);
})