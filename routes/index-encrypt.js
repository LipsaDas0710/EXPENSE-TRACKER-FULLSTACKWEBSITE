const express=require('express');
const { encrypt } = require('../controllers/encrypt');
const router =express.Router();

router.post("/:username/:expenseId",encrypt);
module.exports=router;