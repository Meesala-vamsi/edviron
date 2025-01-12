const express = require("express");
const {
  fetchTransactionsBySchool,
  checkStatus,
  updateStatusManually,
  fetchAllTransactions,
} = require("../controllers/transactionController");
const router = express.Router();
router.get("/allTransactions", fetchAllTransactions);
router.get("/:id", fetchTransactionsBySchool);
router.get("/order/:id",checkStatus);
router.post("/updateStatus",updateStatusManually);


module.exports = router;