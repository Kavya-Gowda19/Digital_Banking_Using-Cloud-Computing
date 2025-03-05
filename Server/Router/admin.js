const express = require("express");
const router = express.Router();
const { Adminreg, Login,View} = require("../Controller/admin");
// const Authadmin = require("../middleware/authadmin")

router.post("/adminreg", Adminreg)
router.post("/login", Login)
// router.get("/get", Authadmin, View)


module.exports  = router; 