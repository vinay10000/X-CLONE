import { aj } from "../config/arcjet.js";

//arcjet middleware for rate limiting and bot detection and security

export const arcjetMiddleware = async (req,res,next)=>{
    try{
        const decision = await aj.protect(req,{ //each req consumes 1 token
            requested:1,
        })
        //handle denied requests
        if(decision.isDenied()){
            if(decision.isRateLimit()){
                return res.status(429).json({error:"Too many requests",message:"You have exceeded the rate limit"})
            }
            else if(decision.reason.isBot()){
                return res.status(403).json({error:"Forbidden",message:"You are not allowed to access this resource"})
            }
            else{
                return res.status(403).json({error:"Forbidden",message:"You are not allowed to access this resource"})
            }
        }
        //check for spoofed bots
        if(decision.results.some((res)=>res.reason.isBot()&&res.reason.isSpoofed())){
            return res.status(403).json({error:"Spoofed bot detected",message:"You are not allowed to access this resource"})
        }
        next()
    }
    catch(e){
        console.log("Error in arcjet middleware",e)
        next()
    }
}