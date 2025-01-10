const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

// Drop existing indexes first (you can run this once manually)
// BlacklistToken.collection.dropIndexes();

// Create compound index with unique token and expiry
blacklistTokenSchema.index(
    { token: 1, createdAt: 1 }, 
    { unique: true }
);

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

module.exports = BlacklistToken;

