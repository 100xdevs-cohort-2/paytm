const express = require("express");
const userRoute = express.Router();
const { handleUserSignUp, handleUserSignIn, handleUpdateUser, filterUsers } = require("../controllers/user")

userRoute.post("/signup", handleUserSignUp)
userRoute.post("/signin", handleUserSignIn)
userRoute.put("/", handleUpdateUser)
userRoute.get("/bulk", filterUsers)


module.exports = userRoute;