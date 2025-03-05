const Transaction = require('../Model/transaction');
const Account = require('../Model/account');
const User = require('../Model/user')

const handleTransaction = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { _id, Amount } = req.body;
    // console.log(req.body, _id, Amount, "bodybody");
    const type = 'deposit';

    // Find the account using _id
    const account = await Account.findById(_id);

    // If the account is not found, return an error response
    if (!account) {
      return res.status(404).json({ message: "Account not found!" });
    }

    // console.log(account,"acoaacc")

    // Update the OpBalance in the account
    const updatedBalance = parseFloat(account.OpBalance || 0) + parseFloat(Amount);
    account.OpBalance = updatedBalance.toString();

    // Save the updated account
    await account.save();

    // Create and save the new transaction
    const newTransaction = new Transaction({ account_id: _id, Amount, type });
    await newTransaction.save();

    // Send success response
    res.status(200).json({ message: "Transaction successfully added and balance updated!" });
  } catch (error) {
    console.error("Some error Occurred: " + error);
    res.status(500).json("Some internal error!!!");
  }
};

const handlewithdraw = async (req, res) => {
    try {
      // Destructure the data from the request body
      const { _id, Amount } = req.body;
    //   console.log(req.body, _id, Amount, "bodybody");
      const type = 'withdrawal';
  
      // Find the account using _id
      const account = await Account.findOne({ _id, Status:'Approved' });
  
      // If the account is not found, return an error response
      if (!account) {
        return res.status(404).json({ message: "This Account not valid!" });
      }
  
    //   console.log(account,"acoaacc")
  
      // Update the OpBalance in the account
      const updatedBalance = parseFloat(account.OpBalance || 0) - parseFloat(Amount);
      account.OpBalance = updatedBalance.toString();
  
      // Save the updated account
      await account.save();
  
      // Create and save the new transaction
      const newTransaction = new Transaction({ account_id: _id, Amount, type });
      await newTransaction.save();
  
      // Send success response
      res.status(200).json({ message: "Transaction successfully withdrawal and balance updated!" });
    } catch (error) {
      console.error("Some error Occurred: " + error);
      res.status(500).json("Some internal error!!!");
    }
  };

 
  const handleView = async (req, res) => {
    try {
      const uid = req.user; // Get the user ID from the request (assuming you have user info in the token)
      
      // Find the user by their ID to get the associated account_id
      const user = await User.findById(uid);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Get the account_id associated with this user
      const accountId = user.account_id;
  
      // Query the transactions where account_id matches the accountId or user_id matches the uid
      const transactions = await Transaction.find({
        $or: [
          { account_id: accountId },  // Match if account_id in Transaction matches the user's account_id
          { user_id: uid }             // Match if user_id in Transaction matches the user ID
        ]
      })
      .populate('account_id')
      .populate('user_id'); // Populate the account_id field with the account details
  
      // Return the filtered transactions with populated account details
      res.json(transactions);
    } catch (error) {
      console.error("Some error occurred: ", error);
      res.status(500).json({ message: "Some internal error!" });
    }
  };



  const handleAmount = async (req, res) => {
    try {
      // Extract data from the request body
      const { name, accountno, IFSC_code } = req.body;
  
      // Check if the required fields are present
      if (!name || !accountno || !IFSC_code) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // Assuming you have an Account model/schema
      const account = await Account.findOne({
        name: name,
        accountno: accountno,
        IFSC_code: IFSC_code,
        Status:"Approved" 
      });
  
      // Check if an account matching the provided details was found
      if (account) {
        console.log(account,"accounttt")
        // If a match is found, return the balance
        return res.status(200).json({ balance: account }); // Assuming 'opbalance' is the balance field in your schema
      } else {
        // If no match is found, return an error message
        return res.status(404).json({ message: "This Account Detail is not valid . Please check your details. or  " });
      }
    } catch (error) {
      console.error("Some error occurred: " + error);
      res.status(500).json({ message: "Some internal error occurred!" });
    }
  };
  
 
    const handlePayment = async (req, res) => {
      try {
        const { accountno, IFSC_code, name, amount } = req.body; // Extract accountno, IFSC_code, name, and amount from request body
        const userId = req.user; // Get user ID from token
    
        // Find the target account using accountno, IFSC_code, and name
        const targetAccount = await Account.findOne({ accountno, IFSC_code, name, Status:"Approved" });
        if (!targetAccount) {
          return res.status(404).json({ message: 'Account not found or details do not match' });
        }
    
        // Update the target account's OpBalance by adding the amount
        targetAccount.OpBalance = String(parseFloat(targetAccount.OpBalance) + parseFloat(amount));
        await targetAccount.save();
     
        // Find the user using the userId to get the user's associated account_id
        const user = await User.findById(userId).populate('account_id');
        if (!user || !user.account_id) {
          return res.status(404).json({ message: 'User or associated account not found' });
        }
          accountfinalid = targetAccount._id;
        // Update the user's associated account's OpBalance by subtracting the amount
        const userAccount = user.account_id;
        userAccount.OpBalance = String(parseFloat(userAccount.OpBalance) - parseFloat(amount));
        await userAccount.save();
    
        // Create a new transaction record in the transaction schema
        const newTransaction = new Transaction({
          user_id: userId,
          account_id:  accountfinalid,
          type: 'payment',
          Amount: amount,
          status: 'completed', // You can change the status based on your logic
        });
    
        await newTransaction.save();
    
        // Send a success response
        res.status(200).json({ message: 'Payment successful', newBalance: userAccount.OpBalance });
      } catch (error) {
        console.error('Some error occurred:', error);
        res.status(500).json('Some internal error!!!');
      }
    };

    
    
    const GetDetails = async (req, res) => {
      try {
        const id = req.params.id; // Get the transaction ID from the request parameters
    
        // Fetch the transaction details with populated user and account data
        const transaction = await Transaction.findById(id)
          .populate('user_id', 'name email') // You can adjust the fields as per your User schema
          .populate('account_id') // Adjust the fields per your Account schema
          .exec();
    
        // If transaction not found, send an error response
        if (!transaction) {
          return res.status(404).json({ message: 'Transaction not found' });
        }
    
        // Send back the transaction, user, and account details
        return res.status(200).json({
          transaction,
          user: transaction.user_id, // This will contain the user details
          account: transaction.account_id, // This will contain the account details
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
    };
    
   
    
module.exports = {
  handleTransaction,handlewithdraw, handleView,  handleAmount, handlePayment, GetDetails
};
