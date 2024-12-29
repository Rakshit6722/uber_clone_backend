const blacklistToken = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

exports.registerCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const hashedPassword = await captainModel.hashPassword(password);

    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

    const token = await captain.generateToken();

    res.status(201).json({ message: "Captain registered successfully", captain, token });
}

exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const captain = await captainService.findCaptainByEmail(email);
        if (!captain) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordMatch = await captain.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await captain.generateAuthToken();
        console.log(token)

        res.cookie('token', token)
        res.status(200).json({ message: "Captain logged in successfully", captain, token });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getCaptainProfile = async(req,res) => {
    return res.status(200).json({message:"Captain profile fetched successfully",captain:req.captain});
}

exports.logoutCaptain = async(req,res) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
    await blacklistToken.create({token});
    res.clearCookie('token');
    return res.status(200).json({message:"Captain logged out successfully"});
}
