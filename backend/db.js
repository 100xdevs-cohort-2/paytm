const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://bkashish077:bkashish077@cluster0.btsmnxe.mongodb.net/"
// );
mongoose.connect("mongodb://localhost:27017");
const Usersschema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
});

const User = mongoose.model(User, Usersschema);

module.exports = {
  User,
};
