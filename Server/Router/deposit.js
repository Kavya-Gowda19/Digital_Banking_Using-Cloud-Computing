const express = require('express');
const router = express.Router();
const { handleTransaction,handlewithdraw, handleView, handleAmount,handlePayment, GetDetails } = require('../Controller/transaction');
const authuser = require('../middleware/authuser')

router.post("/insert", handleTransaction);
router.post("/withdraw", handlewithdraw);
router.get("/transaction",authuser, handleView);
router.post("/amount", handleAmount);
router.post("/payment",authuser, handlePayment)
router.get("/get/:id", GetDetails);




module.exports = router;
