const userLogin= require("../models/user");
const bcrypt=require('bcrypt');

module.exports.loginUser=async function (req,res){
      try{
        const check= await userLogin.findOne({email:req.body.email});
        if(!check){
            return res.status(404).send("User not found.");
        }

        const isPasswordMatch =await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            const userEmail =check.email; 
            const userName =check.username; 

            req.session.userId = check._id;

            res.redirect(`/expense/${userName}`);
        }
        else{
            res.status(401).send("Incorrect password.");
        }
    }catch (error) {
        res.status(500).send("Server error");
    }
}
