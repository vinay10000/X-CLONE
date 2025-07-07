import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";

const app = express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/notifications",notificationRoutes)

const startServer = async () => {
    try{
        await connectDB()
        app.listen(ENV.PORT,()=>{
            console.log(`Server is running on port ${ENV.PORT}`)
        })
    }
    catch(e){
        console.log("Error starting server",e)
        process.exit(1)
    }
}

startServer()

