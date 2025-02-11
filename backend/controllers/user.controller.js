import userModel from "../models/user.models.js"
import * as userService from '../services/user.service.js'
import {validationResult} from 'express-validator'
import redisClient from '../services/redis.service.js'


// This controller will first validate the things coming
export const createUserController=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:error.array() });
    }
    try {
        const user=await userService.createUser(req.body);

        const token=await user.generateJWT();
        
        res.status(201).json({user,token})
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const loginController=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.satatus(400).json({errors:errors.array()});
    }
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email}).select('+password');

        if(!user){
            res.status(401).json({errors:"Invalid Credentials"})
        }

        const isMatch=await user.isValidPassword(password)

        if(!isMatch){
            res.status(401).json({errors:"Invalid Credentials"})

        }

        const token=await user.generateJWT();
        res.status(200).json({user,token});
    } catch (error) {
        res.status(400).send(error.message);
    }
}


// profile controller should run only for authenticated users therefore we will create a middleware 
export const profileController=async(req,res)=>{
    console.log(req.user)
    res.status(200).json({
        user:req.user
    });
}

export const logoutController=async(req,res)=>{
    try {
        const token=req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        redisClient.set(token,'logout','EX',60*60*24);

        res.status(200).json({
            message:"Loggout out Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);

    }
}