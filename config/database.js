const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
}
