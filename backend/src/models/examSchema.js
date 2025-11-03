const mongoose=require('mongoose');

const examSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdby:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }]
},{timestamps:true});

module.exports=mongoose.model("Exam",examSchema);