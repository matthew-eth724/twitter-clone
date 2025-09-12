const {model, Schema, SchemaTypes} = require("mongoose")

const post = new Schema({
    author: {type: SchemaTypes.ObjectId, required: true, ref: "User"},
    content: {type: String, required: true},
    likes: [{type: SchemaTypes.ObjectId, ref: "User"}],
    comments: [{type: SchemaTypes.ObjectId, ref: "Post"}],
    replyingTo: {type: SchemaTypes.ObjectId, ref: "Post"},
    bookmarks: [{type: SchemaTypes.ObjectId, ref: "User"}],
    views: [{type: SchemaTypes.ObjectId, ref: "User"}],
    interactions: [{type: SchemaTypes.ObjectId, ref: "User"}],
    datePublished: {type: Date, default: date.now()},
})

post.set("toJSON", {
    transform: (doc, obj) => {
        obj.likes = obj.likes.length
        obj.views = obj.views.lenth
        obj.bookmarks = obj.bookmarks.length
        obj.comments = obj.comments.length
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.interactions
        delete obj.__v
    }
})

const Post = model("Post", post)

module.exports = Post