import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const protect = async(req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            if(!req.user){
                throw new apiError(400,"User not found")
            }

            return next()
        } catch (error) {
            console.error("Auth Error is",error)
            throw new apiError(401,"Not authorized token failed")
        }
    }

    if(!token){
        throw new apiError(401,"Not authorized, token failed")
    }
}

export const admin = async(req,res,next) => {
    if(req.user && req.user.role === "admin"){
        return next()
    }
    return res.json(
        new apiError(403,"Access denied: Admin only")
    )
}