// import bcrypt for hash
const bcrypt=require('bcrypt');
// import models
const user=require('../models/studentSchema');


// Sign up routes
exports.signUp=async(req,res)=>{
    try{
        const {name,email,password,role,marks,rank}=req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // if user not exist
        // hashed the password
        try{
            const hashedPassword=await bcrypt.hash(password,10);
        }
        catch(error){
             res.status(500).json({
                success:false,
                message:"Hashing of the password failed"
             });
        }

        // create entry for user
        const newuser={
                name,
                email,
                password,
                role,
        }

        if(role==='Student'){
            newuser.marks=marks||0;
            newuser.rank=rank||0;
        }

        // create user
        const newEntry=await user.create(newuser);

        return res.status(200).json({
            success:true,
            message:"User Register Successfully "
        })
    }
    catch(error){
        res.status(400).json({
                success:false,
                message:"Something went wrong",
                error:error.message
             });
    }

}