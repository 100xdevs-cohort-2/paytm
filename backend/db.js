const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://bkashish077:bkashish077@cluster0.btsmnxe.mongodb.net/"
);

const Usersschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
});
const User = mongoose.model("User", Usersschema);

const Accountschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  balance: { type: Number, required: true },
});

const Account = mongoose.model("Account", Accountschema);

module.exports = {
  User,
  Account,
};
