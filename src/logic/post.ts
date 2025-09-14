import { IPost, PostModel, UserModel } from "../models/index";
import { removeItem } from "../utils/index";
import { Types, Schema } from "mongoose";

export const createPost = async (userId: string, data: { content: string; replyingTo?: string }): Promise<IPost> => {
    try {
        const { content, replyingTo } = data;
        const post: IPost = await new PostModel({author: userId, content, replyingTo}).save();
        
        const user: any = await UserModel.findById(userId);
        if (user) {
            user.posts.push(post._id as any);
            await UserModel.findByIdAndUpdate(userId, {posts: user.posts});
        }
        
        if (replyingTo) {
            await reply((post._id as any).toString(), replyingTo);
        }

        return post;
    } catch (error) {
        throw error;
    }
};

export const readPost = async (postId: string): Promise<IPost> => {
    try {
        const post: any = await PostModel.findById(postId);
        return post
    } catch (error) {
        throw error;
    }
};

export const readPosts = async (userId: string): Promise<IPost[]> => {
    try {
        return await PostModel.find({author: userId});
    } catch (error) {
        throw error;
    }
};

export const updatePost = async (postId: string, data: { content: string }): Promise<IPost> => {
    try {
        const { content } = data;
        await PostModel.findByIdAndUpdate(postId, {content});
        const post: any = await PostModel.findById(postId);
        return post
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (postId: string): Promise<void> => {
    try {
        const post = await PostModel.findByIdAndDelete(postId);
        if (!post) return;

        const user: any = await UserModel.findById(post.author);
        if (user) {
            await UserModel.findByIdAndUpdate(post.author, {posts: removeItem(user.posts, (post._id as any).toString())});
        }
    } catch (error) {
        throw error;
    }
};

const reply = async (postId: string, replyingTo: string): Promise<void> => {
    try {
        const post: any = await PostModel.findById(replyingTo);
        if (post) {
            post.comments.push(postId as any);
            await PostModel.findByIdAndUpdate(replyingTo, {comments: post.comments});
        }
    } catch (error) {
        throw error;
    }
};

export const likePost = async (postId: string, userId: string): Promise<void> => {
    try {
        const user: any = await UserModel.findById(userId);
        if (user) {
            user.likes.push(postId as any);
            await UserModel.findByIdAndUpdate(userId, {likes: user.likes});
        }
        
        const post: any = await readPost(postId);
        if (post) {
            post.likes.push(userId as any);
            await PostModel.findByIdAndUpdate(postId, {likes: post.likes});
        }
    } catch (error) {
        throw error;
    }
};

export const unlikePost = async (postId: string, userId: string): Promise<void> => {
    try {
        const user: any = await UserModel.findById(userId);
        if (user) {
            await UserModel.findByIdAndUpdate(userId, {likes: removeItem(user.likes, postId)});
        }

        const post: any = await readPost(postId);
        if (post) {
            await PostModel.findByIdAndUpdate(postId, {likes: removeItem(post.likes, userId)});
        }
    } catch (error) {
        throw error;
    }
};

export const bookmarkPost = async (postId: string, userId: string): Promise<void> => {
    try {
        const user: any = await UserModel.findById(userId);
        if (user) {
            user.bookmarks.push(postId as any);
            await UserModel.findByIdAndUpdate(userId, {bookmarks: user.bookmarks});
        }

        const post: any = await PostModel.findById(postId);
        if (post) {
            post.bookmarks.push(userId as any);
            await PostModel.findByIdAndUpdate(postId, {bookmarks: post.bookmarks});
        }
    } catch (error) {
        throw error;
    }
};

export const unbookmarkPost = async (postId: string, userId: string): Promise<void> => {
    try {
        const user: any = await UserModel.findById(userId);
        if (user) {
            await UserModel.findByIdAndUpdate(userId, {bookmarks: removeItem(user.bookmarks, postId)});
        }

        const post: any = await PostModel.findById(postId);
        if (post) {
            await PostModel.findByIdAndUpdate(postId, {bookmarks: removeItem(post.bookmarks, userId)});
        }
    } catch (error) {
        throw error;
    }
};

export const viewPost = async (postId: string, userId: string): Promise<void> => {
    try {
        const post: any = await readPost(postId);
        if (post) {
            post.views.push(userId as any);
            await PostModel.findByIdAndUpdate(postId, {views: post.views});
        }
    } catch (error) {
        throw error;
    }
};

export const interact = async (postId: string, userId: string): Promise<void> => {
    try {
        const post: any = await readPost(postId);
        if (post) {
            post.interactions.push(userId as any);
            await PostModel.findByIdAndUpdate(postId, {interactions: post.interactions});
        }
    } catch (error) {
        throw error;
    }
};

export const getUserBookmarks = async (userId: string): Promise<IPost[]> => {
    try {
        const user: any = await UserModel.findById(userId);
        if (!user) return [];
        
        let posts: IPost[] = [];
        for (let i = 0; i < user.bookmarks.length; i++) {
            const post = await readPost(user.bookmarks[i].toString());
            if (post) posts.push(post);
        }
        return posts;
    } catch (error) {
        throw error;
    }
};

export const getUserLikes = async (userId: string): Promise<IPost[]> => {
    try {
        const user: any = await UserModel.findById(userId);
        if (!user) return [];
        
        let posts: IPost[] = [];
        for (let i = 0; i < user.likes.length; i++) {
            const post = await readPost(user.likes[i].toString());
            if (post) posts.push(post);
        }
        return posts;
    } catch (error) {
        throw error;
    }
};

export const getUserPosts = async (userId: string): Promise<IPost[]> => {
    try {
        return PostModel.find({author: userId});
    } catch (error) {
        throw error;
    }
};

export const getReplies = async (postId: string): Promise<IPost[]> => {
    try {
        return await PostModel.find({replyingTo: postId});
    } catch (error) {
        throw error;
    }
};
