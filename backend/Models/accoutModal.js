const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
