const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
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
    marks:{
        type:Number,
        default:null
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