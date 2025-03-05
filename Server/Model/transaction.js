const mongoose = require("mongoose")
const {Schema} = mongoose
const transactionSchema = new Schema(
{
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    account_id:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"account"
        },

    type: { type: String, enum: ['deposit', 'withdrawal', 'payment']
               
            },

    Amount:{
            type:String
        },

       
    date:{
            type:Date,
            default: Date.now
        },
    status:{
        type:String,
    },
       
    
}
)

module.exports = mongoose.model("transaction", transactionSchema);