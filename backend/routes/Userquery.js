const express = require("express");
const router = express.Router();
const { User } = require("../db");
router.get("/", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstname: { $regex: filter ,$options:"i" } }, { lastname: { $regex: filter,$options:"i" } }]//ik this syntax sucks but in this $or stands for at least one condition is checked and $regex is same as like operator in sql and we are converting in an array so we can apply map method in it
  });
  res.json({
    user: await users.map(user=>({
        username:user.username,
        firstname:user.firstname,
        lastnamename:user.lastname,
        _id:user._id

    }))
  })


});

module.exports = router;
