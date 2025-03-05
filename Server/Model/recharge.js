const mongoose = require("mongoose");
const { Schema } = mongoose;

const rechargeSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    Sim_type: {
        type: String,
    },
    Contact_no: {
        type: String,
    },
    Amount: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now, // Default to current date and time
    },
});

module.exports = mongoose.model("recharge", rechargeSchema);
