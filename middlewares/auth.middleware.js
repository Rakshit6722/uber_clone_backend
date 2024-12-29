const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const blackListTokenModel = require("../models/blacklistToken.model");

exports.authUser = async(req,res,next) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1] ;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const isBlacklisted = await blackListTokenModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Unauthorized access"});
        }
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }
}


