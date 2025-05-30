const userLogin= require("../models/user");
const userExpense = require('../models/expense');

module.exports.deleteFeatures=async function (req,res) {
      const deleteMyExpense = await userExpense.findOne({_id:req.params.expenseId});
        if (!deleteMyExpense) {
            return res.status(404).send("User not found in expense");
        }

        const deleteExpense= await userExpense.findOneAndDelete({ _id: req.params.expenseId });

        const userId=req.params.username;
        const targetUrl = `/expense/${userId}`;
        res.redirect(targetUrl);
}

module.exports.editFeatures=async function (req,res) {
    let createdUser = await userLogin.findOne({username:req.params.username}).populate("expense");
            if (!createdUser) {
                return res.status(404).send("User not found in expense");
            }
            const userId=req.params.username;
            const expense = createdUser.expense.find(
                (exp) => exp._id.toString() === req.params.expenseId
            );
            const checkEdit=expense.edit;

            if(checkEdit){
                const targetUrl = `/create/${userId}/?expenseId=${req.params.expenseId}`;
                res.redirect(targetUrl);
            }else{
                const targetUrl = `/expense/${userId}/`;
                res.redirect(targetUrl);
            } 
}

module.exports.shareFeatures= async function (req,res) {
    let createdUser = await userLogin.findOne({username:req.params.username}).populate("expense");
            if (!createdUser) {
                return res.status(404).send("User not found in expense");
            }
            const userId=req.params.username;
            const expense = createdUser.expense.find(
                (exp) => exp._id.toString() === req.params.expenseId
            );
            const checkShare=expense.share;

            if(checkShare){
                res.send(`/views/${userId}/${req.params.expenseId}`);
                
            }else{
                res.send("File is non shareable");
                
            }   
    
}