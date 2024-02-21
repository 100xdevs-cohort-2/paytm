import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://Yogesh:Yogesh%40mongo1@cluster0.vnzn2j6.mongodb.net/usersDataBase"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true, minLength: 8 },
  firstname: { type: String, required: true, maxLength: 50, trim: true },
  lastname: { type: String, required: true, maxLength: 50, trim: true },
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true },
  balance: { type: Number, required: true },
});

export const Account = mongoose.model("account",accountSchema)
export const User = mongoose.model("users", userSchema);
