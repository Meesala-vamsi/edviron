const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  collect_id: String,
  school_id: String,
  gateway: String,
  order_amount: Number,
  transaction_amount: Number,
  status: String,
  bank_refrence: String,
  custom_order_id: String,
});
const Transactions =  mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;