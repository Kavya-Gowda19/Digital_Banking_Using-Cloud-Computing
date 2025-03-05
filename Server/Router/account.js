const express = require("express");
const router = express.Router();
const { Insert, View, Delete, Singleview, Update } = require("../Controller/account");
const {UserInsert} = require("../Controller/useraccount")

const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // specify the upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname); // unique filename
  },
});

// Multer middleware to handle file uploads
const imageUpload = multer({ storage: storage });

// Route with file upload handling
router.post(
  "/insert",
  imageUpload.fields([
    { name: "userimg", maxCount: 1 },
    { name: "aadharcardid", maxCount: 1 },
    { name: "pancardid", maxCount: 1 },
    { name: "signeid", maxCount: 1 },
    { name: "nominee_signeid", maxCount: 1 },
  ]),
  (req, res, next) => {
    // First, log the form data and uploaded files for debugging
    console.log("Form Data:");
    console.log("Uploaded Files:");

    // Call the Insert function and pass the request and response
    Insert(req, res, next); 
    
  }
);

router.get("/view", View)
router.delete("/delete/:id", Delete)
router.get("/singleView/:id", Singleview)
router.put(
  "/update/:id",
  imageUpload.fields([
    { name: "userimg", maxCount: 1 },
    { name: "adharacardid", maxCount: 1 },
    { name: "pancardid", maxCount: 1 },
    { name: "signeid", maxCount: 1 },
    { name: "nominee_signeid", maxCount: 1 },
  ]),
  (req, res, next) => {
    // First, log the form data and uploaded files for debugging
    console.log("Form Data:");
    console.log("Uploaded Files:");

    // Call the Insert function and pass the request and response
    Update(req, res, next); 
    
  }
);



 
router.post(
  "/userinsert",
  imageUpload.fields([
    { name: "userimg", maxCount: 1 },
    { name: "adharacardid", maxCount: 1 },
    { name: "pancardid", maxCount: 1 },
    { name: "signeid", maxCount: 1 },
    { name: "nominee_signeid", maxCount: 1 },
  ]),
  (req, res, next) => {
    // First, log the form data and uploaded files for debugging
    console.log("Form Data:");
    console.log("Uploaded Files:");

    // Call the Insert function and pass the request and response
    UserInsert(req, res, next); 
    
  }
);



module.exports = router;
