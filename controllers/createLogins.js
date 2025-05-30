const userLogin= require("../models/user");
const bcrypt=require('bcrypt');
const generateToken = require('../utils/generateToken');
const user = require("../models/user");

module.exports.createLogins=async function (req,res){
    const { usernameLogins, emailLogins, passwordLogins } = req.body;
    const existingUser =await userLogin.findOne({email:req.body.emailLogins})
            if(existingUser){
                res.send("User already exists.(Please use another mail id.)")
            }
            else{
                let createlogin ={
                    username:req.body.usernameLogins,
                    email:req.body.emailLogins,
                    password:req.body.passwordLogins,
                }
        
                try {
                    const saltRounds=5;
                    const hashPassword=await bcrypt.hash(createlogin.password, saltRounds);
                    createlogin.password= hashPassword;
                    await userLogin.insertMany([createlogin]);
                 

                    const token=generateToken({ username: createlogin.username, email: createlogin.email});
                    res.cookie("token",token,{
                        httpOnly:true,
                        secure:false,
                        maxAge:30*24*60*60*1000,
                    });
                    
                    res.redirect(`/expense/${createlogin.username}`); 

                } catch (error) {
                    console.error("Error inserting login:", error);
                    if (!res.headersSent) {
                      return res.status(500).send("Error saving login details");
                    }
                }
            }
}