import { model, Schema, SchemaTypes, Document } from "mongoose";

export interface IPost extends Document {
    author?: Schema.Types.ObjectId;
    content?: string;
    likes?: Schema.Types.ObjectId[];
    comments?: Schema.Types.ObjectId[];
    replyingTo?: Schema.Types.ObjectId;
    bookmarks?: Schema.Types.ObjectId[];
    views?: Schema.Types.ObjectId[];
    interactions?: Schema.Types.ObjectId[];
    datePublished?: Date;
}

const post = new Schema<IPost>({
    author: {type: SchemaTypes.ObjectId, required: true, ref: "User"},
    content: {type: String, required: true},
    likes: [{type: SchemaTypes.ObjectId, ref: "User"}],
    comments: [{type: SchemaTypes.ObjectId, ref: "Post"}],
    replyingTo: {type: SchemaTypes.ObjectId, ref: "Post"},
    bookmarks: [{type: SchemaTypes.ObjectId, ref: "User"}],
    views: [{type: SchemaTypes.ObjectId, ref: "User"}],
    interactions: [{type: SchemaTypes.ObjectId, ref: "User"}],
    datePublished: {type: Date, default: Date.now},
});

post.set("toJSON", {
    transform: (doc: any, obj: any) => {
        obj.likes = obj.likes.length;
        obj.views = obj.views.length; // Fixed typo: was "lenth"
        obj.bookmarks = obj.bookmarks.length;
        obj.comments = obj.comments.length;
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.interactions;
        delete obj.__v;
    }
});

const Post = model<IPost>("Post", post);

export default Post;
