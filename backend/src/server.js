import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
const app = express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(arcjetMiddleware)
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/notifications",notificationRoutes)
//error handling middleware
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).json({message:"Internal server error",error:err.message})
})
const startServer = async () => {
    try{
        await connectDB()
        //listen for local development not in production
        if(ENV.NODE_ENV !== "production"){
            app.listen(ENV.PORT,()=>{
                console.log(`Server is running on port ${ENV.PORT}`)
            })
        }
        else{}
    }
    catch(e){
        console.log("Error starting server",e)
        process.exit(1)
    }
}

startServer()
//export for vercel
export default app