const { model, Schema, SchemaTypes } = require("mongoose")

const user = new Schema({
    username: {type: String, unique: true, required: true, max: 16, min: 1},
    name: String,
    passwordHash: {type: String, unique: true, required: true},
    bio: String,
    dateCreated: {type: Date, default: Date.now()},
    followers: [{type: SchemaTypes.ObjectId, ref: "User"}],
    following: [{type: SchemaTypes.ObjectId, ref: "User"}],
    posts: [{type: SchemaTypes.ObjectId, ref: "Post"}],
    likes: [{type: SchemaTypes.ObjectId, ref: "Post"}],
    bookmarks: [{type: SchemaTypes.ObjectId, ref: "Post"}],
    active: Boolean,
    blocked: [{type: SchemaTypes.ObjectId, ref: "User"}]
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