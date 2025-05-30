const express=require('express');
const router =express.Router();
const userLogin= require("../models/user");
const userExpense = require('../models/expense');

const { deleteFeatures } = require('../controllers/features');

router.get("/:username/:expenseId",deleteFeatures);
module.exports=router;