const express = require('express');
const router = express.Router();
const { Userreg, Login, User, Usera, Delete } = require('../Controller/user');
const authUser = require('../middleware/authuser');
const multer = require("multer");
const { UserInsert, Update,  UserUpdate } = require('../Controller/useraccount');

// Middleware for parsing JSON and URL encoded data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // unique file name
  }
});

const upload = multer({ storage: storage });

// POST route for user data and file upload
router.post("/userinsert", upload.fields([
  { name: 'aadharcardid' },
  { name: 'pancardid' },
  { name: 'signeid' },
  { name: 'userimg' },
  { name: 'nominee_signeid' }
]), (req, res) => {
  const userData = req.body;
  const files = req.files;

  // Send the data to the controller
  UserInsert(req, res); // Call the controller to handle the logic
});

router.post("/reg", Userreg);
router.post("/login", Login);
router.get("/view", Usera);
router.get("/vieww", authUser, User);
router.delete("/delete/:id", Delete);
router.put("/userupdate/:id", Update);
router.put("/update/", authUser, UserUpdate);



module.exports = router;
