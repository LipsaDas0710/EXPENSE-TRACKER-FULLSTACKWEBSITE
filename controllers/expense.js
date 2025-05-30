const userLogin= require("../models/user");
const userExpense= require("../models/expense");

module.exports.expense=async function(req,res){
    let createdUser = await userLogin
    .findOne({ username:req.params.username })
    .populate({
      path: "expense",
      options: { sort: { date: -1 } } // Sort by date in descending order
    });
    if (!createdUser) {
        return res.status(404).send("User not found in expense");
    }
  
    const expenseFile=createdUser.expense;
    //const title = createdUser.title;
    res.render("allExpense",{username:req.params.username,createdUser,expenseFile});
}