const userLogin= require("../models/user");
const userExpense= require("../models/expense");
const bcrypt=require('bcrypt');

module.exports.encrypt=async function (req,res) {
    try{
    let createdUser = await userLogin.findOne({username:req.params.username}).populate("expense");
        if (!createdUser) {
            return res.status(404).send("User not found in expense");
        }

    const expense = createdUser.expense.find(
        (exp) => exp._id.toString() === req.params.expenseId
    );

    if (!expense) {
        return res.status(404).send("Expense not found");
      }

    const checkPassword=expense.password;
    if (!checkPassword) {
        return res.status(400).send("Password not set for this expense");
      }   
    const isPasswordMatch =await bcrypt.compare(req.body.passwordLogins, checkPassword);
    if (isPasswordMatch) {
 
        //const useremail =req.params.useremail;
        const username =req.params.username;
        const expenseId = req.params.expenseId; 

        res.redirect(`/views/each/${username}/${expenseId}`);
    }
    else{
        res.status(401).send("Incorrect password.");
    }
  }catch (error) {
    console.error(error);
    res.status(500).send("Server error");
}
}