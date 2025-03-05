const express = require('express');
const router = express.Router();
const {  getDashboardSummary } = require('../Controller/records');


router.get("/getDashboardSummary",  getDashboardSummary);




module.exports = router;
