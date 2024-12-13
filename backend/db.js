const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://niteesharisetty:Nittu@project0.j1ses.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {User};
