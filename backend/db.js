const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:1234567890@cluster0.kr1umr2.mongodb.net/paytm"
);

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
