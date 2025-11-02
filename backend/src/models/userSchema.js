const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role:{type:String,default:"student"},
    totalScore: { type: Number, default: 0 },  // total marks from all exams
    rank: { type: Number, default: 0 } 
});

module.exports=mongoose.model("user",userSchema);