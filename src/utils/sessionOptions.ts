import { SECRET } from "./config";

export const sessionOptions = {
    secret: SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 * 24 * 14
    }
};

export default sessionOptions;
