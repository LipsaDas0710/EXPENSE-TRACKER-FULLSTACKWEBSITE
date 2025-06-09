const express=require('express');
const cookieParser = require('cookie-parser');
const app =express();
const bodyParser = require("body-parser");
const path =require('path');
const mongooseconnection= require("./config/mongoose");
const userLogin= require("./models/user");
const userExpense= require("./models/expense");
const bcrypt=require('bcrypt');
const { title } = require('process');
const session = require("express-session");
const PORT = process.env.PORT || 3000;
require('dotenv').config();
require('./config/passport'); // Ensure passport is configured
const passport = require('passport');
const googleAuthRoutes = require('./routes/index-googleAuth');



app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'views')));
app.use( express.static(path.join(__dirname, 'public')));
app.use( express.static(path.join(__dirname, 'scripts')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', googleAuthRoutes);

const indexRouter=require("./routes/index-route");
app.use("/",indexRouter);

const indexSignUp=require("./routes/index-signUp");
app.use('/signUp',indexSignUp);

const indexLogin=require("./routes/index-login");
app.use('/login',indexLogin);

const indexCreate=require("./routes/index-create");
app.use('/create',indexCreate);

const indexExpense=require("./routes/index-expense");
app.use('/expense',indexExpense);

const indexViews=require("./routes/index-views");
app.use('/views',indexViews);

const indexDelete=require("./routes/index-delete");
app.use('/delete',indexDelete);

const indexEdit=require("./routes/index-edit");
app.use('/edit',indexEdit);

const indexShare=require("./routes/index-share");
app.use('/share',indexShare);

const indexEncrypt=require("./routes/index-encrypt");
app.use('/encrypt',indexEncrypt);

const indexAuth=require("./routes/index-auth");
app.use('/auth',indexAuth);

app.listen(PORT , () => {
    console.log('Server is running on port 3000');
});