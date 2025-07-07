import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try{
        await mongoose.connect(ENV.MONGO_URI)
        console.log("Connected to MongoDB successfully✔️")
    }
    catch(e){
        console.log("Error connecting to MongoDB❌")
        console.log(e)
        process.exit(1)
    }
}