const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

// Virtual field for full name
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
});

// This is a pre-defined middleware for userSchema. 
// This middleware will be executed before save() operation is
// performed on any document using this schema.
userSchema.pre('save', async function (next) {
    if (this.isModified('passoword')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})


//Plugin for unique validation

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' })


const User = mongoose.model('User', userSchema);

module.exports = User;

