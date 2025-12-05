import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from "../models/user.models.js"

const generateToken = (userId) =>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

export const registerUser = async(req,res) =>{
    try {
        const {name,email,password,role} = req.body

        if(!name || !email || !password){
            throw new apiError(400,"please fill all the fields")
        }

        const userExist  = await User.findOne({email})
        if(userExist){
            throw new apiError(400,"User already exist")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role: role || "officer",
        })

        return res.status(201).json(
            new apiResponse(
                201,
                {
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    token:generateToken(user._id)
                },
                "user registered successfully"
            )
        )

        
    } catch (error) {
        console.error("error is",error)
        throw new apiError(404,"server error")
    }
}

export const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            throw new apiError(400,"email and password required")
        }

        const user = await User.findOne({email})

        if(!user){
            throw new apiError(400,"Invalid credentials")
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            throw new apiError(400,"Wrong password")
        }

        return res.status(201).json(
            new apiResponse(
                200,
                {
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    token:generateToken(user._id)
                },
                "user logged in successfully"
            )
        )
    } catch (error) {
        console.error("error is",error)
        throw new apiError(500,"server error")
    }
}

export const getMe = async(req,res) => {

    try {
        const user = await User.findById(req.user._id).select("-password")

        if(!user){
            throw new apiError(400,"User not found")
        }
        return res.json(user)
    } catch (error) {
        console.error("Error is ",error)
        throw new apiError(500,"server error")
    }
}