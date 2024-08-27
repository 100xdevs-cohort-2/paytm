const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstname: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
