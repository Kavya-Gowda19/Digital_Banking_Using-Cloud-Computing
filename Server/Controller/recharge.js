const recharge = require('../Model/recharge');
const user = require('../Model/user');
const account = require('../Model/account');

const Insert = async (req, res) => {
  try {
    // Extract data from the request
    const { Sim_type, Contact_no, Amount } = req.body;
    const user_id = req.user; // Assuming `req.user` contains the authenticated user's ID

    // Step 1: Retrieve the user's details using the user_id
    const userDetails = await user.findById(user_id).populate('account_id'); // Populate account details

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    const accountDetails = userDetails.account_id; // Access the associated account details

    if (!accountDetails) {
      return res.status(404).json({ message: "Account not linked to the user" });
    }

    // Step 2: Check if the account has sufficient balance
    const currentBalance = parseFloat(accountDetails.OpBalance);
    const rechargeAmount = parseFloat(Amount);

    if (currentBalance < rechargeAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Step 3: Deduct the amount from the account balance
    const updatedBalance = currentBalance - rechargeAmount;
    accountDetails.OpBalance = updatedBalance.toFixed(2);

    // Save the updated account balance
    await accountDetails.save();

    // Step 4: Store the recharge details in the recharge collection
    const rechargeDetails = new recharge({
      user_id: user_id,
      Sim_type: Sim_type,
      Contact_no: Contact_no,
      Amount: rechargeAmount,
    });

    await rechargeDetails.save();

    // Step 5: Respond with success
    return res.status(200).json({
      message: "Recharge successful",
      rechargeDetails,
      updatedBalance,
    });
  } catch (error) {
    console.error("Error in Insert:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const View = async(req,res)=>{
    try {
        const uid = req.user;
      
        if (!uid) {
            return res.status(400).json({ message: 'User not authenticated' });
        }
        const data = await recharge.find({ user_id: uid })
      
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No recharge data found for the user' });
        }
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}



module.exports = {
  Insert, View
};
