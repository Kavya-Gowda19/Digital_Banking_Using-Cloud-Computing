const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authuser')
const {Insert} = require('../Controller/electricity');

router.post("/insert", authUser,Insert);


module.exports = router;