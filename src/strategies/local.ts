import passport from "passport";
import { Strategy } from "passport-local";
import { readUser } from "../logic/user";
import bcrypt from "bcrypt";

const localStrategy = passport.use(new Strategy(async (username: string, password: string, done: any) => {
    try {
        const user: any = await readUser(username);
        if (!user) {
            throw new Error("BAD CREDENTIALS");
        }
        
        const isPassword = await bcrypt.compare(password, user.passwordHash);

        if (!isPassword) {
            throw new Error("BAD CREDENTIALS");
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

export { localStrategy };
export default localStrategy;
