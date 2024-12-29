const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname, email, password} = req.body;

    const hashedPassword = await userModel.encryptPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({message:"User created successfully", user, token});
}

exports.loginUser = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token = user.generateAuthToken();

    res.cookie('token',token)
    res.status(200).json({message:"Login successful", user, token});
}

exports.getUserProfile = async(req,res) => {
    res.status(200).json({message:"User profile fetched successfully", user:req.user});
}