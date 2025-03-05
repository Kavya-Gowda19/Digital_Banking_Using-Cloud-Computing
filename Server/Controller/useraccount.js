const Account = require("../Model/account");
const User = require("../Model/user")
const crypto = require("crypto");

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


const UserInsert = async (req, res) => {
  try {
    const { 
      type, name, phone, aadharcardno, email, pancardno, age, address,
      nominee_name, nominee_email, nominee_contactNumber, nominee_relationship, nominee_address 
    } = req.body;

    // Validate 'type'
    const validTypes = ['Saving', 'Current', 'Business'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid account type. Please select from 'Saving', 'Current', or 'Business'." });
    }

    // Check if email already exists
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: "An account with this email already exists. Please use a different email." });
    }

    // Extract file paths
    const userimg = req.files["userimg"]?.[0]?.path || "";
    const aadharcardid = req.files["aadharcardid"]?.[0]?.path || "";
    const pancardid = req.files["pancardid"]?.[0]?.path || "";
    const signeid = req.files["signeid"]?.[0]?.path || "";
    const nominee_signeid = req.files["nominee_signeid"]?.[0]?.path || "";

    // Generate unique values
    const accountno = generateAccountNumber();
    const IFSC_code = generateIFSCCode();
    const MICR_code = generateMICRCode();

    // Create a new account
    const newAccount = new Account({
      type,
      name,
      phone,
      userimg,
      aadharcardno,
      aadharcardid,
      email,
      pancardno,
      pancardid,
      age,
      accountno,
      IFSC_code,
      MICR_code,
      address,
      signeid,
      Status: 'notApproved',
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

    // Send success response
    res.status(201).json({
      message: "Account created successfully",
      data: newAccount,
    });

  } catch (error) {
    console.error("Error occurred while inserting account:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const Update = async (req, res) => {
  try {
    let id = req.params.id;
    let Statusdata = await Account.findById(id);

    if (!Statusdata) {
      return res.json({ success: false, message: "Data is not found" });
    }

    let action = req.body.action;
    let Status;

    if (action === "Accept") {
      Status = "Approved";
    } else if (action === "Reject") {
      Status = "Rejected";
    } else {
      return res.json({ success: false, message: "Invalid action" });
    }

    let newData = {};
    if (Status) newData.Status = Status;

    // Update the Account schema
    let updatedAccount = await Account.findByIdAndUpdate(id, { $set: newData }, { new: true });

    // If action is "Accept", update the User schema
    if (action === "Accept") {
      // Find user with matching email and phone
      let userToUpdate = await User.findOne({
        email: Statusdata.email,
        phone: Statusdata.phone,
      });

      console.log(userToUpdate,"usertoUpdate...........")

      if (userToUpdate) {
        const newUserData = {
          status: "Account Verified",
          account_id: updatedAccount._id,
        };

        // Update the User schema
        await User.findByIdAndUpdate(userToUpdate._id, { $set: newUserData }, { new: true });
      }
    }

    res.json({ success: true, updatedAccount });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};



const UserUpdate = async (req, res) => {
  try {
    const { name, accountno, IFSC_code } = req.body;
    const uid = req.user;

    // Check if the account exists with the given details and is approved
    const account = await Account.findOne({
      name,
      accountno,
      IFSC_code,
      Status: "Approved",
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found or not approved",
      });
    }

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      uid,
      {
        account_id: account._id,
        status: "Account Verified",
      },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to update user",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};



module.exports = { UserInsert , Update,  UserUpdate};
