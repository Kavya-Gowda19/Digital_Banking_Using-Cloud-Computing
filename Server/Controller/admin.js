const adminSchema  = require('../Model/admin');
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRETE_KEY = "DIGITALBANKING";

const Adminreg = async (req,res)=>{
    try {

        const { name, email,phone, password} = req.body;
        let checkemail =  adminSchema.findOne({email:email});
       
        if(checkemail){

            console.log("Email already exists!");
            res.json({success: false, message: "Email already exists"});
        }else{

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            let newadmin = await new adminSchema({
                name,
                email,
                password: hashedPassword,
                phone,
            });

            let savedadmin = await newadmin.save();
            console.log("New admin registered Successfully");
            res.json({
                success:true,
                message: " new admin reqistered successfully ",
                admin: savedadmin,
                
            })

        }
    } catch (error) {
        
        console.log("Error occurred", error);
        res.json({error: error})

    }
}


const Login = async (req, res)=>{

    try {
        const { email, password } = req.body;
        let admin = await adminSchema.findOne({email:email});
        if(!admin){

            console.log("Invalid credential!!");
            res.json({ success: false, message: "Invalid credential!" });
        }else{

            let checkpass = await bcrypt.compare(password, admin.password);
            if(!checkpass){

                console.log("Invalid Password!");
        res.json({ success: false, message: "Invalid credential!" });
            }else{
                let adminid = admin.id;
                let tocken = await jsonwebtoken.sign(adminid, SECRETE_KEY);
                console.log(" Login successfully ");
                console.log(tocken,"tocken");
                res.json({
                    message:"Login Successfully",
                    success: true,
                    loggedInadmin: admin,
                    adminToken: tocken,
                })
            }

        }
        
    } catch (error) {

        console.log("Error occurred", error);
        res.json({error: error})
        
    }

}


const View = async(req,res)=>{
    try {
        const uid = req.admin;
        const data = await adminSchema.findById(uid);
        // console.log(data);
        res.json(data)
    } catch (error) {

        console.error("Some error Occured"+error);
        res.status(500).json("Some internal error!!!")
        
    }
}




module.exports={
    Adminreg, Login, View
}