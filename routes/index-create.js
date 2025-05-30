const express=require('express');
const router =express.Router();
const userLogin= require("../models/user");
const userExpense= require("../models/expense");
const bcrypt = require('bcrypt');



router.get("/:username", async (req,res)=>{

    let createdUser = await userLogin.findOne({username:req.params.username}).populate("expense");
    if (!createdUser) {
        return res.status(404).send("User not found");
    }

    let expenseData = {};
    if (req.query.expenseId) {
        // Fetch the expense from the database using the expenseId
        expenseData = await userExpense.findById(req.query.expenseId);
    }
    res.render("create",{username:req.params.username,expenseData});
});

router.post("/save/:username",async(req,res)=>{
    let createdUser = await userLogin.findOne({username:req.params.username});
    if (!createdUser) {
        return res.status(404).send("User not found");
    }

    const { title, content, password, encrypt, edit, share, _id: expenseId } = req.body;
    
    //check if expense ID exist then update or save
    if (expenseId) {
        // Update the existing expense
        await userExpense.findByIdAndUpdate( expenseId,{ title, content, password });
        const userId=createdUser.username;
        const redirectExpenseId = expenseId;
        const targetUrl = `/views/${userId}/${redirectExpenseId}`;
        res.redirect(targetUrl);
    }
    else{
        
        let hashedPassword = null;
        const password=req.body.password;
        if (encrypt && password) {
            try {
                const saltRounds = 10;
                hashedPassword = await bcrypt.hash(password, saltRounds); // Hash password on the server
            } catch (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Failed to hash password.");
            }
        }
        //create
        let createdExpense =await userExpense.create({
            edit: req.body.edit,
            share: req.body.share,
            encrypt: req.body.encrypt,
            password:hashedPassword,
            title: req.body.title,
            content: req.body.content,
            user: createdUser._id,
        });
        //push and save
        createdUser.expense.push(createdExpense._id);
        await createdUser.save();
        //awarness
        const userId=createdUser.username;
        const expenseId=createdExpense._id;
        //rediect
        const targetUrl = `/views/${userId}/${expenseId}`;
        res.redirect(targetUrl);
    }

});


module.exports=router;