const captainModel = require("../models/captain.model");

exports.createCaptain = async({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All fields are required");
    }

    const captain = await captainModel.findOne({email});
    if(captain){
        throw new Error("Captain already exists");
    }

    const createdCaptain = await captainModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return createdCaptain;
}
