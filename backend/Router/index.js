import express from "express";
import { Router } from "express";
import { userRouter } from "./user.js";
import { accountRouter } from "./accountRouter.js";

const router = Router();

router.use("/user",userRouter)
router.use("/account",accountRouter)
router.get("/", (req, res) => {
  res.send("working fine");
});

export { router };
