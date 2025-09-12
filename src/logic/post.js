const Post = require("../models").PostModel
const User = require("../models").UserModel
const removeItem = require("../utils").removeItem

const createPost = async (userId, data) => {
    try {
        const { content, replyingTo } = data
        const post = await new Post({author: userId, content, replyingTo}).save()
        
        if (replyingTo)
            await reply(post._id.toString(), replyingTo)

        return post
    } catch (error) {
        throw error
    }
}

const readPost = async (postId) => {
    try {
        return await Post.findById(postId)
    } catch (error) {
        throw error
    }
}

const readPosts = async (userId) => {
    try {
        return await Post.find({author: userId})
    } catch (error) {
        throw error
    }
}

const updatePost = async (postId, data) => {
    try {
        const { content } = data
        await Post.findByIdAndUpdate(postId, {content})
        return await Post.findById(postId)
    } catch (error) {
        throw error
    }
}

const deletePost = async (postId) => {
    try {
        await Post.findByIdAndDelete(postId)
    } catch (error) {
        throw error
    }
}

const reply = async (postId, replyingTo) => {
    try {
        const post = await Post.findById(replyingTo)
        post.comments.push(postId)
        await Post.findByIdAndUpdate(replyingTo, {comments: postcss.comments})
    } catch (error) {
        throw error
    }
}

const likePost = async (postId, userId) => {
    try {
        const user = await User.findById(userId)
        user.likes.push(postId)
        await User.findByIdAndUpdate(userId, {likes: user.likes})
        
        const post = await readPost(postId)
        post.likes.push(userId)
        await Post.findByIdAndUpdate(postId, {likes: post.likes})
    } catch (error) {
        throw error
    }
}

const unlikePost = async (postId, userId) => {
    try {
        const user = await User.findById(userId)
        await User.findByIdAndUpdate(userId, {likes: removeItem(user.likes, postId)})

        const post = await readPost(postId)
        await Post.findByIdAndUpdate(postId, {likes: removeItem(post.likes, userId)})
    } catch (error) {
        throw error
    }
}

const bookmarkPost = async (postId, userId) => {
    try {
        const user = await User.findById(userid)
        user.bookmarks.push(postId)
        await User.findByIdAndUpdate(userId, {bookmarks: user.bookmarks})

        const post = await Post.findById(postId)
        post.bookmarks.push(userId)
        await Post.findByIdAndUpdate(postId, {bookmarks: post.bookmarks})
    } catch (error) {
        throw error
    }
}

const unbookmarkPost = async (postId, userId) => {
    try {
        const user = await User.findById(userId)
        await User.findByIdAndUpdate(userId, {bookmarks: removeItem(user.bookmarks, postId)})

        const post = await Post.findById(postId)
        await Post.findByIdAndUpdate(postId, {bookmarks: removeItem(post.bookmarks, userId)})
    } catch (error) {
        throw error
    }
}

const viewPost = async (postId, userId) => {
    try {
        const post = await readPost(postId)
        post.views.push(userId)
        await Post.findByIdAndUpdate(postId, {views: post.views})
    } catch (error) {
        throw error
    }
}

const interact = async (postId, userId) => {
    try {
        const post = await readPost(postId)
        post.interactions.push(userId)
        await Post.findByIdAndUpdate(postId, {interactions: post.interactions})
    } catch (error) {
        throw error
    }
}

const getUserBookmarks = async (userId) => {
    try {
        const user = await User.findById(userId)
        let posts = []
        for (i = 0; i < user.bookmarks.length; i++) {
            posts.push(await readPost(user.bookmarks[i]))
        }
        return posts
    } catch (error) {
        throw error
    }
}

const getUserLikes = async (userId) => {
    try {
        const user = await User.findById(userId)
        let posts = []
        for (i = 0; i < user.likes.length; i++) {
            posts.push(await readPost(user.likes[i]))
        }
        return posts
    } catch (error) {
        throw error
    }
}

module.exports = {
    createPost, readPost, readPosts, updatePost, deletePost, getUserLikes, getUserBookmarks,
    interact, viewPost, unbookmarkPost, bookmarkPost, unlikePost, likePost
}