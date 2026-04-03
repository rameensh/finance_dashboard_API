const { transactionSchema } = require("../schemaValidate.js");
const ExpressError = require("../util/ExpressError");
const Transaction = require("../models/transaction");
const User = require("../models/user");


// Middleware to validate transaction data using Joi
module.exports.validateTransaction = (req, res, next) => {
  let { error } = transactionSchema.validate(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }else{
        next();
    }
}