const Result=require('../models/resultSchema');

exports.resultController=async(req,res)=>{
    try{
        const {studentId}=req.params;
        const results = await Result.find({ studentId })
        .populate("examId", "title date totalMarks")
        .sort({ createdAt: -1 });

        if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found for this student",
      });
    }

    res.status(200).json({
      success: true,
      message: "All exam results fetched successfully",
      data: results,
    });


    }catch(error){
       res.status(401).json({ success:true,
        message:"Something went wrong while fetching result "
       })
    }
}