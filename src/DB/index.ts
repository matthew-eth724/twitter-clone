import mongoose from "mongoose";
import { URI } from "../utils/config";

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(URI);
        console.log("DB up and running");
    } catch (error) {
        throw error;
    }
};

export default connect;
