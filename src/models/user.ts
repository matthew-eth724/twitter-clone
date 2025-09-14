import { model, Schema, SchemaTypes, Document } from "mongoose";

export interface IUser extends Document {
    username?: string;
    name?: string;
    passwordHash?: string;
    bio?: string;
    dateCreated: Date;
    followers?: Schema.Types.ObjectId[];
    following?: Schema.Types.ObjectId[];
    posts?: Schema.Types.ObjectId[];
    likes?: Schema.Types.ObjectId[];
    bookmarks?: Schema.Types.ObjectId[];
    active?: boolean;
    blocked?: Schema.Types.ObjectId[];
    lastUsernameChange?: Date;
}

const user = new Schema<IUser>({
    username: {type: String, unique: true, required: true, max: 16, min: 1},
    name: String,
    passwordHash: {type: String, unique: true, required: true},
    bio: String,
    dateCreated: {type: Date, default: Date.now},
    followers: [{type: SchemaTypes.ObjectId, ref: "User"}],
    following: [{type: SchemaTypes.ObjectId, ref: "User"}],
    posts: [{type: SchemaTypes.ObjectId, ref: "Post"}],
    likes: [{type: SchemaTypes.ObjectId, ref: "Post"}],
    bookmarks: [{type: SchemaTypes.ObjectId, ref: "Post"}],
    active: {type: Boolean, default: true},
    blocked: [{type: SchemaTypes.ObjectId, ref: "User"}],
    lastUsernameChange: {type: Date, default: Date.now}
});

user.set("toJSON", {
    transform: (document: any, obj: any) => {
        obj.id = obj._id.toString();
        delete obj.__v;
        delete obj.passwordHash;
        delete obj._id;
    }
});

const User = model<IUser>("User", user);

export default User;
