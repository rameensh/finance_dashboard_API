const Joi = require("joi");

module.exports.transactionSchema = Joi.object({
  amount: Joi.number().min(0).required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required(),
  date: Joi.date().optional(),
  notes: Joi.string().optional(),
  userID: Joi.string().optional()
});
