const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware");

const { Account } = require("../db");
const mongoose = require("mongoose");
const app = express();
// app.use(express.json());
router.use(express.json());
router.get("/balance", authmiddleware, async function (req, res) {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

// router.post("/transfer", authmiddleware, async function (req, res) {
//   const { amount, to } = req.body;
//   const senderuser = Account.findOne({
//     userId: req.userId,
//   });

//   if (senderuser.balance < amount) {
//     return res.status(401).json({
//       msg: "insufficient balance",
//     });
//   }

//   const toaccount = Account.findOne({
//     userId: to,
//   });
//   if (!toaccount) {
//     return res.status(401).json({
//       msg: "invalid account",
//     });
//   }

//   await Account.updateOne(
//     {
//       userId: req.userId,
//     },
//     {
//       $inc: {
//         balance: -amount,
//       },
//     }
//   );

//   await Account.updateOne(
//     {
//       userId: to,
//     },
//     {
//       $inc: {
//         balance: amount,
//       },
//     }
//   );

//   res.json({
//     msg: "updated successfully",
//   });
// });

router.post("/transfer", authmiddleware, async function (req, res) {
  console.log("hi transfer");
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();

    return res.status(401).json({
      msg: "insufficient balance ",
    });
  }
  const toaccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toaccount) {
    await session.abortTransaction();
    return res.status(401).json({
      msg: "invalid account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    message: "tannsfer successful",
  });
});

module.exports = router;
