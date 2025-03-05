const jwt = require("jsonwebtoken");
const SECRETE_KEY = "DIGITALBANKING";

const authAdmin = (req,res,next)=>{
    const token= req.header("auth-token");
    if(!token){
        res.send("token not found");
    } 
    try{
console.log(token)
        const adminid = jwt.verify(token,SECRETE_KEY)
        req.admin = adminid;
        next();
    }catch(err){

        console.log(err)

    }
};

module.exports = authAdmin;