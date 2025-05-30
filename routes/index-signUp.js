const express=require('express');
const router =express.Router();
const {signupUser}=require("../controllers/signup");
const {createLogins}=require("../controllers/createLogins");



router.get("/",signupUser);
router.post("/createLogins",createLogins);


module.exports=router;