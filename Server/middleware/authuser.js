const jwt= require("jsonwebtoken");
const SECRETE_KEY = "DIGITALBANKING";

const authUser = (req,res,next)=>{
    const token= req.header("auth-token");
    if(!token){
        res.send("token not found");
    } 
    try{
console.log(token , "token")
const userid = jwt.verify(token,SECRETE_KEY)
        req.user = userid;
        next();
    }catch(err){

        console.log(err)

    }
};

module.exports = authUser;