import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { createComment, deleteComment, getComments } from "../controllers/comment.controller";

const router = express.Router()
//protected route
router.post("/post/:postId",protectRoute,createComment)
router.delete("/:commentId",protectRoute,deleteComment)
//public route
router.get("/post/:postId",getComments)

export default router