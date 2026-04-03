const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Type is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',       
    required: true
  },
  isDeleted: { // if a users transaction is failed to delete, we can mark it as deleted instead of removing it from the database
    type: Boolean,
    default: false     
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);