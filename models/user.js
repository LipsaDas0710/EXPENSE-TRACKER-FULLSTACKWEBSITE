const mongoose= require('mongoose');

const Logins=mongoose.Schema({
        username:String ,
        email: String ,
        password: String ,
        googleId: {
                type: String,
                default: null
        },
        expense:[{
                type:mongoose.Schema.Types.ObjectId, 
                ref: "userExpense"
        }]
})


module.exports=mongoose.model("userLogins",Logins);