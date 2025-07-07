import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    profilePicture:{
        type:String,
        required:true
    },
    bannerImage:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:"",
        maxlength:170
    },
    location:{
        type:String,
        default:""
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
},{timestamps:true})
const User = mongoose.model("User",userSchema)
export default User