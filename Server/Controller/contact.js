const contact = require('../Model/contact')

const handleContact = async(req,res)=>{
    try {

        // console.log(req.body);
        const { name,email,phone,message}= req.body
        const newContact = new contact({ name,email,phone,message });
        await newContact.save();
        res.status(200).json({ message: "Data inserted successfully" });


        
    } catch (error) {
           console.error("Some error Occurred: " + error);
      res.status(500).json("Some internal error!!!");
    }
}

const handleView = async (req,res)=>{
    try {
      const data = await contact.find()
      // console.log(data);
      res.json(data)
    } catch (error) {
      console.error("Some error Occured"+error);
      res.status(500).json("Some internal error!!!")
    }
  }

  const handledelete = async(req, res)=>{
    try   {
        const data = await contact.findById(req.params.id);
    if (!data) {
      console.log("Data not found with this ID");
      return res.status(404).send("Data does not exist with this ID!");
    } else {
      await contact.findByIdAndDelete(req.params.id);
      console.log("Data deleted successfully...");
      res.json({"Success": true, "Deleted Data": data});
    }
  } catch (error) {
    console.error("Some error occurred: " + error);
    res.status(500).json("Some internal error!");
  
  }
}

module.exports= {handleContact, handleView, handledelete}