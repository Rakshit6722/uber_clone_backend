const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const captainModel = require("../models/captain.model");
const blackListTokenModel = require("../models/blacklistToken.model");

exports.authUser = async(req,res,next) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1] ;
    // console.log(token)
    if(!token){
        return res.status(401).json({message:"Token not found"});
    }

    const isBlacklisted = await blackListTokenModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized, token blacklisted"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded._id);

        if(!user){
            return res.status(401).json({message:"Unauthorized access"});
        }
        req.user = user;
        console.log(req.user)
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }
}

exports.authCaptain = async(req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split('')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const isBlacklisted = await blackListTokenModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const captain = await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(401).json({message:"Unauthorized access"});
        }
        req.captain = captain;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized",err:err.message});
    }
}   


