// Step 1: Require Express and Create Router
const express=require('express');
const router=express.Router();

// Step 2: Import Controller Function
const {createQuestion}=require('../controllers/questionController');

// Step 3: Define Route
router.post('/createQuestion',createQuestion);

// Step 4: Export Router
module.exports=router;
