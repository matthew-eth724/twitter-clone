const { express, cors, session, passport, cookieParser } = require("./utils").imports
const  { errorHandler, requestLogger } = require("./middleware")
const { config: {PORT}, sessionOptions } = require("./utils")

const DBConnect = require("./DB")
const apiRouter = require("./routes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(session(sessionOptions))
app.use(requestLogger)
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use("/api", apiRouter)

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
    console.log(`http://localhost:${PORT}`);
})

try {
    DBConnect()
} catch (error) {
    console.error("DB CONNECTION ERROR", error)
}

app.get("/", (req, res) => res.send("Hello world"))

app.use(errorHandler)
