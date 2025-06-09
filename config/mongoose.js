require('dotenv').config(); // <-- Add this at the top

const mongoose = require('mongoose');
const debuglog = require('debug')('development:mongooseconfig');

// Use Atlas connection string from .env
mongoose.connect(process.env.MONGODB_URI)
.then(() => debuglog('MongoDB connected successfully'))
.catch((err) => debuglog('MongoDB connection error:', err));

const db = mongoose.connection;

db.on("error", (err) => {
    debuglog(err);
});

module.exports = db;



// const mongoose= require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/testingdb");

// const debuglog = require("debug")("development:mongooseconfig");

// const db=mongoose.connection;

// db.on("error",(err)=>{
//     debuglog(err);
// })

// module.exports=db;

