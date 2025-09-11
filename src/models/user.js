const { model, Schema } = require("mongoose")

const user = new Schema({
    username: {type: String, unique: true, required: true, max: 16, min: 1},
    name: String,
    passwordHash: {type: String, unique: true, required: true},
    bio: String,
    dateCreated: {type: Date, default: Date.now()},
})

user.set("toJSON", {
    transform: (document, obj) => {
        obj.id = obj._id.toString()
        delete obj.__v
        delete obj.passwordHash
        delete obj._id
    }
})

const User = model("User", user)

module.exports = User