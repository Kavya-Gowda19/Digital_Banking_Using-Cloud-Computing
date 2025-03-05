const electricity = require('../Model/Electricity');
const Account = require('../Model/account');
const User = require('../Model/user');

const Insert = async (req, res) => {
    try {
      const user_id = req.user;
      const { RRR_no, date, Amount } = req.body;
  
      // Parse the date from the request body
      const billDate = new Date(date); // Convert string to Date object
      if (isNaN(billDate)) {
        return res.status(400).json({ message: "Invalid date format" });
      }
  
      const billMonth = billDate.getMonth();
      const billYear = billDate.getFullYear();
  
      // Check if a bill for the same month and year with the same RRR_no already exists
      const existingBill = await electricity.findOne({
        user_id,
        RRR_no,
        date: {
          $gte: new Date(billYear, billMonth, 1), // Start of the month
          $lt: new Date(billYear, billMonth + 1, 1), // Start of the next month
        },
      });
  
      if (existingBill) {
        return res.status(400).json({ message: "Bill for this month with the same RRR No. has already been paid." });
      }
  
      // Find the user and populate the account details
      const user = await User.findById(user_id).populate('account_id');
      if (!user || !user.account_id) {
        return res.status(404).json({ message: "User or account not found" });
      }
  
      // Get the account details
      const account = user.account_id;
  
      // Check if the account has sufficient balance
      const currentBalance = parseFloat(account.OpBalance);
      const billAmount = parseFloat(Amount);
  
      if (currentBalance < billAmount) {
        return res.status(400).json({ message: "Insufficient funds in the account" });
      }
  
      // Deduct the amount from the account balance
      account.OpBalance = (currentBalance - billAmount).toFixed(2);
      await account.save();
  
      // Save the electricity bill
      const newBill = new electricity({ user_id, RRR_no, date: billDate, Amount });
      await newBill.save();
  
      res.status(200).json({ message: "Electricity bill paid successfully" });
    } catch (error) {
      console.error("Some error occurred: " + error);
      res.status(500).json({ message: "Some internal error occurred" });
    }
  };
  
 

module.exports = {
  Insert,
};
