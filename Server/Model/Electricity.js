const mongoose = require("mongoose");
const { Schema } = mongoose;

const electricitySchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    RRR_no: {
        type: String,
    },
    date: {
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

module.exports = mongoose.model("electricity", electricitySchema);
