const Transaction = require('../Model/transaction');
const Account = require('../Model/account');
const User = require('../Model/user');
const Contact = require('../Model/contact'); // Ensure the model name matches your setup

const getDashboardSummary = async (req, res) => {
    try {
        // Get today's start and end time
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Fetch all counts concurrently
        const [totalUsers, totalAccounts, totalTransactions, totalQueries] = await Promise.all([
            User.countDocuments(), // Count total users
            Account.countDocuments(), // Count total accounts
            Transaction.countDocuments({ date: { $gte: startOfDay, $lt: endOfDay } }), // Count today's transactions
            Contact.countDocuments({ date: { $gte: startOfDay, $lt: endOfDay } }) // Count today's queries
        ]);

        // Send the consolidated response
        res.status(200).json({
            totalUsers,
            totalAccounts,
            totalTransactions,
            totalQueries
        });
    } catch (error) {
        console.error("Error fetching dashboard summary:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getDashboardSummary
};
