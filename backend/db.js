import mongoose ,{Schema, model} from "mongoose"

// console.log(process.env.MONGO_DB_URL)
try {
    await mongoose.connect(process.env.MONGO_DB_URL)
} catch (error) {
    console.log(error)
}

const userSchema= new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
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

export const User=model('User',userSchema);

const accountSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    balance: {
        type: Number,
        required: true
    }
});

export const Account=model('Account',accountSchema);

