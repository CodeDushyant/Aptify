// Step 1: Require Express and Create Router
const express=require('express');
const router=express.Router();

// Step 2: Import Controller Function
const {createQuestion}=require('../controllers/questionController');
const {createExam}=require('../controllers/examController');
const {signUp,login}=require('../Auth/AuthUser');
const{createRanking}=require('../controllers/rankingController');


// Step 3: Define Route
router.post('/createQuestion',createQuestion);
router.post('/createExam',createExam);
router.post('/signup',signUp)
router.post('/login',login)
router.post('/createRanking',createRanking);

// Step 4: Export Router
module.exports=router;
