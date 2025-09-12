require("dotenv").config()

const PORT = process.env.PORT || 3000
const SECRET = process.env.SECRET || "SECRET"
const URI = process.env.URI || "mongodb://127.0.0.1:27017/myApp"

module.exports ={
    PORT, SECRET, URI
}