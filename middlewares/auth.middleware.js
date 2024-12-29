const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.authUser = async(req,res,next) => {
    const token = req.headers.authorization.replace('Bearer ','') || req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }
}


