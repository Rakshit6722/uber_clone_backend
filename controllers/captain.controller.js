const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult} = require("express-validator");

exports.registerCaptain = async(req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }

    const {fullname,email,password,vehicle} = req.body;

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    const token = await captain.generateToken();

    res.status(201).json({message:"Captain registered successfully",captain,token});
}