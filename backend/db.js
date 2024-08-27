const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectionString = require('./routes/dbcred');

// const uri = connectionString;

mongoose.connect(connectionString);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    password_hash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    } 
});

userSchema.statics.createHash = async (plainPassword) => {
    const salt = await bcrypt.genSalt(2);
    return await bcrypt.hash(plainPassword, salt);
}

userSchema.statics.validatePassword = async (candidatePassword, stored_password_hash) => {
    // console.log(candidatePassword, stored_password_hash);
    return await bcrypt.compare(candidatePassword, stored_password_hash);
}

const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    },

})

const Account = mongoose.model('Account', accountSchema);

module.exports = ({
    User,
    Account
})