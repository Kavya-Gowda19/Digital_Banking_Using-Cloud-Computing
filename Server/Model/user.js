const mongoose = require("mongoose")
const {Schema} = mongoose
const userSchema = new Schema(
{
   
    account_id:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"account"
        },
        name :{
            type: String,
        },
        password:{
            type:String
        },
        phone:{
            type:String
        },
        image:{
            type:String
        },
        email:{
            type:String
        },
        status:{
            type:String
        }
       
        
   
}
)

module.exports = mongoose.model("user", userSchema);