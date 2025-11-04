// Step 1: Require Express and Create Router
const express=require('express');
const router=express.Router();

// Step 2: Import Controller Function
const {createQuestion}=require('../controllers/questionController');
const {createExam}=require('../controllers/examController');
const {signUp,login}=require('../Auth/AuthUser');
const{getAllRanking}=require('../controllers/rankingController');
const{auth,isStudent,isSuperAdmin,isDesignAdmin}=require('../middleware/Auth');
const{createDesignAdmin}=require('../controllers/createDesignAdmin');
const{resultController}=require('../controllers/resultController');
const{submitExam}=require('../controllers/submitExam')
// Step 3: Define Route
router.post('/signup',signUp)
router.post('/login',login)
// router.post('/createRanking',createRanking);
router.get('/getAllRanking',getAllRanking);
// Only DAdmin can access these
router.post('/createQuestion', auth, isDesignAdmin, createQuestion);
router.post('/createExam', auth, isDesignAdmin, createExam);
router.post('/createDesignAdmin',auth,isSuperAdmin,createDesignAdmin);
// student result controller
router.get('/student/:studentId',resultController);
router.post('/submitExam', auth, isStudent, submitExam);



// protected Routes
router.get('/student-dashboard',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to student protected routed"
    })
})

router.get('/SuperAdmin-dashboard',auth,isSuperAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Super admin Protected Routes"
    })
})
router.get('/DesignAdmin-dashboard',auth,isDesignAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Design admin Protected Routes"
    })
})

// protected testing route in which only one auth is run
router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to Testing Protected Routes"
    })
})

// Step 4: Export Router
module.exports=router;
