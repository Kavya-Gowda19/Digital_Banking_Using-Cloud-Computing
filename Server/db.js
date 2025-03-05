const mongoose = require("mongoose");

const ConnectURL = "mongodb+srv://likhithakanavu:Tz6YysaLptcudjkP@digitalbankingnew.dahbl.mongodb.net/digitalbanking";

const ConnectToMongoDb = async ()=>{
    try {
        await mongoose.connect(ConnectURL);
        console.log("Connection to mongo is a success");
    } catch (error) {
        console.log("Connection to mongo is Unsuccessful",error);
        
    }
};

module.exports = ConnectToMongoDb;










