const crypto = require("crypto");
const Account = require("../Model/account");

// Function to generate a unique account number (14-digit)
const generateAccountNumber = () => {
  return crypto.randomInt(10000000000000, 99999999999999).toString();
};

// Function to generate a unique IFSC code (11 characters, alphanumeric)
const generateIFSCCode = () => {
  return "BARB" + crypto.randomBytes(4).toString("hex").toUpperCase().substring(0, 7);
};

// Function to generate a unique MICR code (9-digit number)
const generateMICRCode = () => {
  return crypto.randomInt(100000000, 999999999).toString();
};

const Insert = async (req, res) => {
  try {
    // Destructure the account details from the request body
    const {
      name, phone, aadharcardno, email, pancardno, age, address,
      nominee_name, nominee_email, nominee_contactNumber, nominee_relationship,
      nominee_address, type, OpBalance
    } = req.body;

    // Extract file paths
    const userimg = req.files["userimg"]?.[0]?.path || "";
    const aadharcardid = req.files["aadharcardid"]?.[0]?.path || "";
    const pancardid = req.files["pancardid"]?.[0]?.path || "";
    const signeid = req.files["signeid"]?.[0]?.path || "";
    const nominee_signeid = req.files["nominee_signeid"]?.[0]?.path || "";

    // Validate that OpBalance is a valid number
    if (isNaN(OpBalance) || OpBalance <= 0) {
      return res.status(400).json({ message: "Please provide a valid opening balance" });
    }

    // Check if the email already exists
    const existingEmail = await Account.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    // Generate unique values for account number, IFSC code, and MICR code
    const accountno = generateAccountNumber();
    const IFSC_code = generateIFSCCode();
    const MICR_code = generateMICRCode();

    // Check for uniqueness of account number, IFSC code, and MICR code
    const existingAccount = await Account.findOne({
      $or: [
        { accountno },
        { IFSC_code },
        { MICR_code }
      ]
    });

    if (existingAccount) {
      return res.status(400).json({ message: "An account with the same account number, IFSC code, or MICR code already exists." });
    }

    // Create a new account using the Account model
    const newAccount = new Account({
      name,
      phone,
      userimg,
      aadharcardno,
      aadharcardid,
      email,
      pancardno,
      pancardid,
      age,
      address,
      signeid,
      accountno,
      IFSC_code,
      MICR_code,
      type,
      OpBalance,
      Status: 'Approved',
      nominee: {
        nominee_name,
        nominee_email,
        nominee_contactNumber,
        nominee_relationship,
        nominee_address,
        nominee_signeid,
      },
    });

    // Save the new account to the database
    await newAccount.save();

    // Send a success response
    res.status(201).json({
      message: "Account created successfully",
      data: newAccount,
    });
  } catch (error) {
    console.error("Error occurred while inserting account:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const View = async (req,res)=>{
  try {
    const data = await Account.find()
    // console.log(data);
    res.json(data)
  } catch (error) {
    console.error("Some error Occured"+error);
    res.status(500).json("Some internal error!!!")
  }
}


const Delete  = async(req,res)=>{

  try {
    console.log(req.params.id,"params")
    const data = await Account.findById(req.params.id);
    if (!data) {
      console.log("Data not found with this ID");
      return res.status(404).send("Data does not exist with this ID!");
    } else {
      await Account.findByIdAndDelete(req.params.id);
      console.log("Data deleted successfully...");
      res.json({"Success": true, "Deleted Data": data});
    }
  } catch (error) {
    console.error("Some error occurred: " + error);
    res.status(500).json("Some internal error!");
  }

}


const Singleview = async (req, res) => {
  try {
    let job = await Account.findById(req.params.id)
    if (!job) {
      console.log("Job not found with this ID!");
      res.json({
        success: false,
        message: "Job not found with this ID!",
      });
    } else {
      res.json({
        success: true,
        message: "Job fetched successfully",
        data: job,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const Update = async (req, res) => {
  try {
    let id = req.params.id;
    
    // Extract fields from the request body
    const {
      name, phone, aadharcardno, email, pancardno, age, address,
      nominee_name, nominee_email, nominee_contactNumber, nominee_relationship,
      nominee_address, type, OpBalance
    } = req.body;

    // Ensure the account to be updated exists
    let existingAccount = await Account.findById(id);
    if (!existingAccount) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    // Build an object with the new data
    let updatedData = {
      name,
      phone,
      aadharcardno,
      email,
      pancardno,
      age,
      address,
      type,
      OpBalance,
      nominee: {
        nominee_name,
        nominee_email,
        nominee_contactNumber,
        nominee_relationship,
        nominee_address,
      },
    };

    // Update file paths if new files are uploaded
    if (req.files) {
      if (req.files["userimg"] && req.files["userimg"][0]) {
        updatedData.userimg = req.files["userimg"][0].path;
      }
      if (req.files["adharacardid"] && req.files["adharacardid"][0]) {
        updatedData.aadharcardid = req.files["adharacardid"][0].path;
      }
      if (req.files["pancardid"] && req.files["pancardid"][0]) {
        updatedData.pancardid = req.files["pancardid"][0].path;
      }
      if (req.files["signeid"] && req.files["signeid"][0]) {
        updatedData.signeid = req.files["signeid"][0].path;
      }
      if (req.files["nominee_signeid"] && req.files["nominee_signeid"][0]) {
        updatedData.nominee.nominee_signeid = req.files["nominee_signeid"][0].path;
      }
    }

    // Update the account in the database
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true } // Return the updated document
    );

    // If update is successful, return the updated document
    if (updatedAccount) {
      res.json({
        success: true,
        message: "Account updated successfully",
        data: updatedAccount,
      });
    } else {
      res.status(500).json({ success: false, message: "Failed to update account" });
    }

  } catch (error) {
    console.error("Error occurred while updating account:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



module.exports = {
  Insert,
  View,
  Delete,
  Singleview,
  Update,
};
