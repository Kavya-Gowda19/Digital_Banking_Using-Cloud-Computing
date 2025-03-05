const { sign } = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = new Schema({
  type: {
    type: String,
    enum: ['Saving', 'Current', 'Business']
  
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  userimg:{
    type:String,
  },
  aadharcardno: {
    type: String,
  },
  aadharcardid: {
    type: String,
  },
  email: {
    type: String,
  },
  pancardno: {
    type: String,
  },
  pancardid: {
    type: String,
  },
  accountno: {
    type: String,
  },
  IFSC_code: {
    type: String,
  },
  MICR_code: {
    type: String,
  },
  signeid: {
    type: String,
  },
  age:{
    type:String
  },
  address:{
    type:String
  },
  OpBalance:{
    type:String
},
Status:{
  type:String
},
  // Adding nominee details
  nominee: {
    nominee_name: {
      type: String,
    },
    nominee_email: {
      type: String,
    },
    nominee_contactNumber: {
      type: String,
    },
    nominee_relationship: {
      type: String,
    },
    nominee_address: {
      type: String,
    },
    nominee_signeid:{
        type:String,
    },
  },
  date:{
    type:Date,
    default: Date.now
},
});

module.exports = mongoose.model("account", accountSchema);
