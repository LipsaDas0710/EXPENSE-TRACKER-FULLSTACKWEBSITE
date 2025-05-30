const userLogin= require("../models/user");

module.exports.checkViews= async function (req,res){
    let createdUser = await userLogin.findOne({username:req.params.username}).populate("expense");
            if (!createdUser) {
                return res.status(404).send("User not found in expense");
            }
            const userId=req.params.username;
            const expenseId =req.params.expenseId
            const expense = createdUser.expense.find(
                (exp) => exp._id.toString() === req.params.expenseId
            );
            const checkEncrypt=expense.encrypt;

            if(checkEncrypt){
                
              
                res.render("encrypt",{username:req.params.username,expenseId:req.params.expenseId});
            }else{
                const targetUrl = `/views/each/${userId}/${expenseId}`;
                res.redirect(targetUrl);
            }   
}

module.exports.testViews= async function (req,res){
    let createdUser = await userLogin.findOne({username:req.params.username}).populate("expense");
        if (!createdUser) {
            return res.status(404).send("User not found in expense");
        }
        //const userId=req.params.useremail;
        const userId=req.params.username;
        const expenseId =req.params.expenseId
        const expense = createdUser.expense.find(
            (exp) => exp._id.toString() === req.params.expenseId
        );
        const checkEncrypt=expense.encrypt;
        if(checkEncrypt){
            res.render("encrypt",{username:req.params.username,expenseId:req.params.expenseId});
        }else{
            const targetUrl = `/views/each/${userId}/${expenseId}`;
            res.redirect(targetUrl);
        }
        
}

module.exports.views= async function (req,res){
    let createdUser = await userLogin.findOne({username:req.params.username}).populate("expense");
            if (!createdUser) {
                return res.status(404).send("User not found in expense");
            }
    const expenseFile = createdUser.expense;
                const expense = createdUser.expense.find(exp => exp._id.toString() === req.params.expenseId);
                if (!expense) {
                    return res.status(404).send("Expense not found");
                }
                expenseFile.forEach((expense, index) => {
                   
                    const title = expense ? expense.title : "No Title";
                    const content = expense ? expense.title : "No Title";
            
                });
                res.render("viewExpense",{username:req.params.username,expenseId:req.params.expenseId,createdUser,expenseFile,expense});

}

module.exports.eachViews= async function (req,res){
    let createdUser = await userLogin.findOne({username:req.params.username}).populate("expense");
    if (!createdUser) {
        return res.status(404).send("User not found");
    }
    const userId=createdUser.username;
    const expenseId=req.params.expenseId;
    const targetUrl = `/views/${userId}/${expenseId}`;
    res.redirect(targetUrl);
}

