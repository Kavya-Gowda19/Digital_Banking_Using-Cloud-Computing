const userSchema  = require('../Model/user');
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const SECRETE_KEY = "DIGITALBANKING";
const Account = require('../Model/account')


const Userreg = async (req, res) => {
    try {
        // console.log(req.body, "users");

        const { name, email, phone, password, accountno, IFSC_code } = req.body;

        // Check if the email already exists
        let checkemail = await userSchema.findOne({ email: email });

        if (checkemail) {
            console.log("Email already exists!");
            res.json({ success: false, message: "Email already exists" });
        } else {
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            let accountID = null;
            let userStatus = "No Account";

            // Verify accountno and IFSC_code if they are provided
            if (accountno && IFSC_code) {
                const account = await Account.findOne({ accountno, IFSC_code });
                if (account) {
                    // If account is found, get the account ID and set the status
                    accountID = account._id;
                    userStatus = "Account Verified";
                } else {
                    // If accountno or IFSC_code is incorrect, send an error message
                    console.log("Incorrect account number or IFSC code.");
                    return res.json({
                        success: false,
                        message: "Your account number or IFSC code is incorrect.",
                    });
                }
            }

            // Create a new user with or without account verification
            let newUser = new userSchema({
                name,
                email,
                password: hashedPassword,
                phone,
                account_id: accountID,
                status: userStatus,
            });

            let savedUser = await newUser.save();
            console.log("New user registered successfully");

            res.json({
                success: true,
                message: "New user registered successfully",
                user: savedUser,
            });
        }
    } catch (error) {
        console.log("Error occurred", error);
        res.json({ error: error });
    }
};



const Login = async (req, res)=>{

    try {
        console.log(req.body)
        const { email, password } = req.body;
        let user = await userSchema.findOne({email:email});
        if(!user){

            // console.log("Already existed Email!");
            res.json({ success: false, message: "Invalid credential!" });
        }else{

            let checkpass = await bcrypt.compare(password, user.password);
            if(!checkpass){

                console.log("Invalid Password!");
        res.json({ success: false, message: "Invalid credential!" });
            }else{
                let userid = user.id;
                let token = await jwt.sign(userid, SECRETE_KEY);
                console.log(token,"hhh")
                console.log(" Login successfully ");
                res.json({
                    message:"Login Successfully",
                    success: true,
                    loggedInUser: user,
                    userToken: token,
                })
            }

        }
        
    } catch (error) {

        console.log("Error occurred", error);
        res.json({error: error})
        
    }

}

const Usera = async(req,res)=>{
    try {
      
        const data = await userSchema.find();
      
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}

const User = async(req,res)=>{
    try {
        const uid = req.user;
        const data = await userSchema.findById(uid).populate('account_id')
      
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}



const Delete  = async(req,res)=>{

    try {

        let data  = await userSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exists with this ID!")
        }else{
            data = await userSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully...");
            res.json({"Success":true, "Deleted Data":data})
        }
        
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }

}   


module.exports={
    Userreg, Login, User, Delete, Usera
}