const express=require('express');
const { shareFeatures } = require('../controllers/features');
const router =express.Router();

router.get("/:username/:expenseId",shareFeatures);

module.exports=router;