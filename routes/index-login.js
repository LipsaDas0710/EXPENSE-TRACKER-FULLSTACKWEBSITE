const express=require('express');
const router =express.Router();
const {loginUser}= require("../controllers/login");
const verifyJWT = require("../middlewear/auth");
 

router.post("/",verifyJWT,loginUser);
module.exports=router;