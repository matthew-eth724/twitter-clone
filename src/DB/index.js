const mongoose = require("mongoose")
const { URI } = require("../utils").config

const connect = async () => {
    try {
        await mongoose.connect(URI)
        console.log("DB up and running")
    } catch (error) {
        throw error
    }
}

module.exports = connect