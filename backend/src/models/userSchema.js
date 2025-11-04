const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    rank:{
        type:Number,
        default:null
    },
    role:{
        type:String,
        enum:["Admin","Student","DAdmin"],
        default:"Student"
    }
},{timestamps:true})

module.exports=mongoose.model("user",userSchema)