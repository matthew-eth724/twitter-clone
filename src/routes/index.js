const userRouter = require("./user")
const { Router } = require("express")
const apiVersion = "v1"

const router = Router()

router.use(`/${apiVersion}/user`, userRouter)

module.exports = router