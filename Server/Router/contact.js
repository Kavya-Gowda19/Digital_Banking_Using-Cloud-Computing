const express = require('express');
const router = express.Router();
const { handleContact, handleView, handledelete } = require('../Controller/contact');

router.post("/insert", handleContact);
router.get("/view", handleView);
router.delete("/delete/:id", handledelete);


module.exports = router;
