// step-1 we need examSchema
const Exam = require('../models/examSchema');

exports.createExam=async(req,res)=>{
    try{
        const {title,description,createdby,duration,questions}=req.body;
        if(!title || !description || !createdby || !duration || !questions){
            return res.status(400).json({
                success:false,
                message:"All field are required while creating exam "
            })
        }

        const exam=new Exam({
            title,
            description,
            createdby,
            duration,
            questions
        });

        await exam.save();

        res.status(200).json({
            success:true,
            message:"Successfully created exam ",
            exam
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error creating exam",
            error:error.message
        })

    }
}