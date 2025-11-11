const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://omkumar3012:QJjfXvdG0tAGueoy@cluster0.x7f2q.mongodb.net/Mere_Paise_Nikal?tls=true"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const User = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  balance: { type: Number, required: true },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
