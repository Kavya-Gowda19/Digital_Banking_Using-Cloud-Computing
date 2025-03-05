const mongoose = require("mongoose")
const {Schema} = mongoose
const adminSchema = new Schema(
{
   
        name :{
            type: String,
        },
        password:{
            type:String
        },
        phone:{
            type:String
        },
        email:{
            type:String
        }
   
}
)

module.exports = mongoose.model("admin", adminSchema);