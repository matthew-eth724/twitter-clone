import dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT || "3000", 10);
export const SECRET: string = process.env.SECRET || "SECRET";
export const URI: string = process.env.URI || "mongodb://127.0.0.1:27017/myApp";

export default {
    PORT, SECRET, URI
};
