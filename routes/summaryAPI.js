const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const wrapAsync = require('../util/wrapAsync');
const { isAuthenticated, authorizeRoles } = require('../middleware/authenticated.js');

router.get("/", isAuthenticated, wrapAsync(async (req, res) => {
    let matchStage = {
      isDeleted: false
    };
    if (req.user.role === "viewer") {
      matchStage.userID = req.user._id;
    }
    const summary = await Transaction.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let income = 0;
    let expense = 0;

    summary.forEach(item => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    });
}));

module.exports = router;