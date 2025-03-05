const express = require('express');
const cors = require("cors");
const app = express(); 
const ConnectToMongoDb = require('./db');
ConnectToMongoDb();
const PORT =8081;
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    console.log("good morning")
    res.send("good morning")
})

app.use("/admin", require("./Router/admin"))
app.use("/user", require('./Router/user'))
app.use("/account",require('./Router/account'))
app.use("/uploads", express.static('./uploads'))
app.use("/deposit", require('./Router/deposit'))
app.use("/contact", require('./Router/contact'))
app.use("/electricity", require('./Router/electricity'))
app.use("/recharge", require('./Router/recharge'))
app.use("/report", require('./Router/records'))


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    
})


//SS5564383

// likhithakanavu
// Tz6YysaLptcudjkP
// IP address (103.167.211.217)
// mongodb+srv://likhithakanavu:Tz6YysaLptcudjkP@digitalbankingnew.dahbl.mongodb.net/
// mongodb://localhost:27017