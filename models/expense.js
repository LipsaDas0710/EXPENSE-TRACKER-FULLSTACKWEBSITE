const mongoose= require('mongoose');


const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userLogins"
    },
    title: String,
    content: String,
    share: {
        type: Boolean,
        default: false
    },
    edit: {
        type: Boolean,
        default: false
    },
    encrypt: {
        type: Boolean,
        default: false
    },
    password: { type: String, 
        default: null 
    },
    date: {
        type: String,
        default: () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
            const year = now.getFullYear().toString().slice(-2); // Extract last 2 digits of the year
            return `${day}-${month}-${year}`;

        //  const now = new Date();
        //  const day = String(now.getDate()).padStart(2, '0');
        //  const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
        //  const year = now.getFullYear().toString().slice(-2); // Last 2 digits of the year
        //  return `${day}-${month}-${year}`; // Fixed date at creation time
    
        }
    }
});

module.exports=mongoose.model("userExpense",expenseSchema);