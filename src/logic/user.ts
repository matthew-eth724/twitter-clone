import { UserModel } from "../models/index";
import bcrypt from "bcrypt";
import { removeItem } from "../utils/index"
import { IUser } from "../models/index";

const SECRET = process.env.SECRET || "secret";

export const createUser = async (data: { username: string; password: string }): Promise<IUser>  => {
    try {
        const { username, password } = data;

        //Username validation
        await validateUsername(username);

        //Password validation
        validatePassword(password);
        
        const passwordHash = await bcrypt.hash(password, 10);
        const user: IUser = new UserModel({name: username, username, passwordHash, active: true});

        return await user.save();

    } catch (error) {
        console.log({
            error: error,
            where: "User Creation"
        });
        throw error;
    }
};

export const readUser = async (id: string): Promise<IUser> => {
    try {
        const userByUsername: any = await readUserByUsername(id.toLowerCase());
        if (userByUsername) {
            return userByUsername;
        }
        
        const user: any = await UserModel.findById(id);
        return user
    } catch (error) {
        console.log({
            error: error,
            where: "User Retrieval"
        });
        throw error;
    }
};

export const readUsers = async (): Promise<IUser[]> => {
    try {
        return await UserModel.find();
    } catch (error) {
        console.log({
            error: error,
            where: "Users Retrieval"
        });
        throw error;
    }
};

const readUserByUsername = async (username: string): Promise<IUser> => {
    try {
        const user: any = await UserModel.findOne({username: username});
        return user
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id: string, data: { name?: string; bio?: string }): Promise<IUser> => {
    try {
        const userByUsername = await readUserByUsername(id);
        if (userByUsername) {
            id = (userByUsername._id as any).toString();
        }

        const { name, bio } = data;
        await UserModel.findByIdAndUpdate(id, {name, bio});
        return await readUser(id);
    } catch (error) {
        console.log({
            error: error,
            where: "User Update"
        });
        throw error;
    }
};

export const deleteUser = async (id: string): Promise<void> => {
    try {
        const userByUsername = await readUserByUsername(id);
        if (userByUsername) {
            id = (userByUsername._id as any).toString();
        }
        
        await UserModel.findByIdAndDelete(id);
    } catch (error) {
        console.log({
            error: error,
            where: "User deletion"
        });
        throw error;
    }
};

const validateUsername = async (username: string) => {
    try {
        const userExists = await UserModel.findOne({username});
        if (userExists) {
            throw new Error("User Already Exists");
        }

        if (!username) {
            throw new Error("Empty username field");
        }

        if (username.length > 32) {
            throw new Error(`Username passes required character length (${username.length})`);
        }

        const uname = username.split("");
        for (let x = 0; x < uname.length; x++) {
            if (uname[x] === " ") {
                throw new Error("Username cannot contain spaces");
            }
        }

    } catch (error) {
        console.log({
            error: error,
            where: "Username Validation"
        });
        throw error;
    }
};

const validatePassword = (password: string) => {
    try {
        if (password.length < 8) {
            throw new Error("password below required character length (8)");
        }

        if (password.length > 32) {
            throw new Error("password above required character length (32)");
        }

        const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "?", ">", "<", "/", ":", ";", "[", "]", "{", "}"];
        let containSpecial = false;
        const pword = password.split("");

        for (let i = 0; i < specialChars.length; i++) {
            for (let x = 0; x < pword.length; x++) {
                if (pword[x] === specialChars[i]) {
                    containSpecial = true;
                }
            }
        }

        if (!containSpecial) {
            throw new Error("password must contain special characters");
        }

        let containNum = false;

        for (let i = 0; i < 10; i++) {
            for (let x = 0; x < pword.length; x++) {
                if (i.toString() === pword[x]) {
                    containNum = true;
                }
            }
        }

        if (!containNum) {
            throw new Error("password must contain a number");
        }

    } catch (error) {
        console.log({
            error: error,
            where: "Password Validation"
        });
        throw error;
    }
};

export const follow = async (userId: string, toFollow: string): Promise<void> => {
    try {
        const user: any = await readUser(userId);
        if (user) {
            user.following.push(toFollow as any);
            await UserModel.findByIdAndUpdate(userId, {following: user.following});
        }

        const following: any = await readUser(toFollow);
        if (following) {
            following.followers.push(userId as any);
            await UserModel.findByIdAndUpdate(toFollow, {followers: following.followers});
        }
    } catch (error) {
        throw error;
    }
};

export const unfollow = async (userId: string, toUnfollow: string): Promise<void> => {
    try {
        const user: any = await readUser(userId);
        if (user) {
            await UserModel.findByIdAndUpdate(userId, {following: removeItem(user.following, toUnfollow)});
        }

        const following: any = await readUser(toUnfollow);
        if (following) {
            await UserModel.findByIdAndUpdate(toUnfollow, {followers: removeItem(following.followers, userId)});
        }
    } catch (error) {
        throw error;
    }
};

export const getFollowers = async (userId: string): Promise<IUser[]> => {
    try {
        const user: any = await readUser(userId);
        if (!user) return [];
        
        let followers = [];
        for (let i = 0; i < user.followers.length; i++) {
            const follower = await readUser(user.followers[i].toString());
            if (follower) followers.push(follower);
        }

        return followers;
    } catch (error) {
        throw error;
    }
};

export const getFollowing = async (userId: string): Promise<IUser[]> => {
    try {
        const user: any = await readUser(userId);
        if (!user) return [];
        
        let followings = [];
        for (let i = 0; i < user.following.length; i++) {
            const following = await readUser(user.following[i].toString());
            if (following) followings.push(following);
        }

        return followings;
    } catch (error) {
        throw error;
    }
};

export const block = async (userId: string, accountId: string): Promise<void> => {
    try {
        const user: any = await readUser(userId);
        if (user) {
            user.blocked.push(accountId as any);
            await UserModel.findByIdAndUpdate(userId, {blocked: user.blocked});
        }
    } catch (error) {
        throw error;
    }
};

export const unBlock = async (userId: string, accountId: string): Promise<void> => {
    try {
        const user: any = await readUser(userId);
        if (user) {
            await UserModel.findByIdAndUpdate(userId, {blocked: removeItem(user.blocked, accountId)});
        }
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (userId: string, newPassword: string): Promise<void> => {
    try {
        validatePassword(newPassword);

        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        await UserModel.findByIdAndUpdate(userId, {passwordHash: newPasswordHash});
    } catch (error) {
        throw error;
    }
};

export const changeUsername = async (userId: string, newUsername: string): Promise<IUser> => {
    try {
        await validateUsername(newUsername);

        const user = await readUser(userId);
        const today = new Date();

        await UserModel.findByIdAndUpdate(userId, {username: newUsername.toLowerCase(), lastUsernameChange: today});
        return await readUser(userId);
    } catch (error) {
        throw error;
    }
};
