import asyncHandler from "express-async-handler";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import { getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";
import Comment from "../models/comment.model.js";

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });
  res.status(200).json({ posts });
});
export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId)
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(200).json({ post });
});
export const getUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });
  const post = await Post.find({ user: user._id })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(200).json({ post });
});

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;
  if (!imageFile || !content)
    return res.status(400).json({ message: "Image or content are required" });

  //upload image to cloudinary
  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ message: "User not found" });
  let imageUrl = "";
  if (imageFile) {
    try {
      const base64Image = `data:${
        imageFile.mimetype
      };base64,${imageFile.buffer.toString("base64")}`;
      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "social_media_posts",
        resource_type: "image",
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto:good" },
          { format: "auto" },
        ],
      });
      imageUrl = uploadResponse.secure_url;
    } catch (error) {
      console.error("Error uploading image to cloudinary:", error);
      return res.status(500).json({ message: "Failed to upload image" });
    }
  }

  const post = await Post.create({
    user: user._id,
    content: content || "",
    imageUrl: imageUrl,
  });
  res.status(201).json({ message: "Post created successfully", post });
});

export const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = getAuth(req);
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });
  const user = await User.findOne({clerkId:userId});
  if (!user) return res.status(404).json({ message: "User not found" });
  const isLiked = post.likes.includes(user._id);
  if(isLiked){
    await Post.findByIdAndUpdate(postId,{$pull:{likes:user._id}})
  }
  else{
    await Post.findByIdAndUpdate(postId,{$push:{likes:user._id}})
    if(post.user.toString() !== user._id.toString()){
        await Notification.create({
            from:user._id,
            to:post.user,
            type:"like",
            post:postId
        })
    }
  }
  res.status(200).json({message:isLiked?"Post unliked successfully":"Post liked successfully",post});
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = getAuth(req);
  const post = await Post.findById(postId);
  const user = await User.findOne({clerkId:userId});
  if (!post) return res.status(404).json({ message: "Post not found" });
  if(!user) return res.status(401).json({message:"Unauthorized"})
  if (post.user.toString() !== user._id.toString()) return res.status(403).json({ message: "Unauthorized,you are not the owner of this post" });
  await Comment.deleteMany({post:postId})
  await Post.findByIdAndDelete(postId)
  res.status(200).json({ message: "Post deleted successfully" });
});