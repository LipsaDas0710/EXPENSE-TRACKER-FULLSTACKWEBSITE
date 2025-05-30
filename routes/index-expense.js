const express=require('express');
const router =express.Router();
const { expense } = require('../controllers/expense');


router.get("/:username",expense);
module.exports=router;