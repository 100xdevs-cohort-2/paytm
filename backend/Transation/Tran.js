const mongoose = require("mongoose");
import { Account } from "../db";

const Transferfunds = async function (fromAccountId, toAccountId, amount) {
  await Account.findByIdAndUpdate(
    fromAccountId,

    {
      $inc: {
        balence: -amount,
      },
    }
  );

  await Account.findByIdAndUpdate(toAccountId, {
    $inc: {
      balence: amount,
    },
  });
};

Transferfunds("fromAccountId", "toAccountId", 100);
