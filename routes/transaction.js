const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");
const ExpressError = require("../util/ExpressError");
const wrapAsync = require("../util/wrapAsync");
const { transactionSchema } = require("../schemaValidate.js");
const { isAuthenticated, authorizeRoles } = require("../middleware/authenticated.js");
const {validateTransaction} = require("../middleware/validate.js");
const mongoose = require("mongoose");

// create route only admin
router.post("/", isAuthenticated, authorizeRoles("admin"), validateTransaction, wrapAsync(async (req, res, next) => {
      const { amount, type, category, date, notes, userID } = req.body;
      const transaction = new Transaction({ amount, type, category, date, notes, userID: userID || req.user._id });
      await transaction.save();

      res.status(201).json({
        message: "Transaction created successfully",
        transaction
      });
  }
));

// get transactions with filters for all
router.get("/", isAuthenticated, wrapAsync(async (req, res, next) => {
    const { category, startDate, endDate, userId } = req.query;

    let filter = {
      isDeleted: false
    };

    if (req.user.role === "viewer") {
      filter.userID = req.user._id;
    }

    // if (req.user.role === "admin" && userId) {
    //   filter.createdBy = userId;
    // }

    if (userId) {
    filter.userID = new mongoose.Types.ObjectId(userId);
    }

    if (category) {
      filter.category = category;
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
}));

// router.get("/users/:id", isAuthenticated, wrapAsync(async (req, res, next) => {
//     const transaction = await Transaction.find({
//     userID: req.params.id,
//     isDeleted: false
//   });
//     if (!transaction || transaction.isDeleted) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     res.json(transaction);
// }));

// get one transaction
router.get("/:id", isAuthenticated, wrapAsync(async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || transaction.isDeleted) {
        return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
}));

// update transaction only admin
router.put("/:id", isAuthenticated, authorizeRoles("admin"), validateTransaction, wrapAsync(async (req, res, next) => {
    const { amount, type, category, date, notes } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || transaction.isDeleted) {
        return res.status(404).json({ message: "Transaction not found" });
    }
    transaction.amount = amount;
    transaction.type = type;
    transaction.category = category;
    transaction.date = date;
    transaction.notes = notes;
    await transaction.save();
    res.json({
        message: "Transaction updated successfully",
        transaction
    });
}));

// delete transaction only admin
router.delete("/:id", isAuthenticated, authorizeRoles("admin"), wrapAsync(async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || transaction.isDeleted) {
        return res.status(404).json({ message: "Transaction not found" });
    }
    transaction.isDeleted = true; // we are doing soft delete, so we mark it as 
    // deleted instead of removing it from the database because if we remove it, 
    // we will lose the data and we won't be able to restore it if needed
    await transaction.save();
    res.json({ message: "Transaction deleted successfully" });
}));

module.exports = router;

