const mongoose = require("mongoose")
const URI = process.env.URI || "mongodb://127.0.0.1:27017/myApp"

const connect = async () => {
    try {
        await mongoose.connect(URI)
        console.log("DB up and running")
    } catch (error) {
        throw error
    }
}

module.exports = connect