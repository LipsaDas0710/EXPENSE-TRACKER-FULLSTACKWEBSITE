const express=require('express');
const { editFeatures } = require('../controllers/features');
const router =express.Router();

router.get("/:username/:expenseId",editFeatures);
module.exports=router;