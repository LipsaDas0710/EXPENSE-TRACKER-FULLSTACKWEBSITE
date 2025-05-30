const express=require('express');
const router =express.Router();

const {testViews,checkViews,eachViews,views}= require("../controllers/views");


router.get("/test/:username/:expenseId", testViews);
router.get("/check/:username/:expenseId", checkViews);
router.get("/each/:username/:expenseId", eachViews);
router.get("/:username/:expenseId", views);


module.exports=router;