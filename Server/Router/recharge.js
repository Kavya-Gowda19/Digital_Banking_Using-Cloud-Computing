const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authuser')
const {Insert, View} = require('../Controller/recharge');

router.post("/insert", authUser,Insert);
router.get("/view", authUser, View);


module.exports = router;