// import bcrypt for hash
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
// import models
const user=require('../models/userSchema');
// load dotenv for secret key
require('dotenv').config();

// Sign up routes
exports.signUp=async(req,res)=>{
    try{
        const {name,email,password,role,marks,rank}=req.body;
        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // if user not exist
        // hashed the password
        // try{
            const hashedPassword=await bcrypt.hash(password,10);
        // }
        // catch(error){
        //      res.status(500).json({
        //         success:false,
        //         message:"Hashing of the password failed"
        //      });
        // }

        // create entry for user
        const newuser={
                name,
                email,
                password:hashedPassword,
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




// login 
exports.login=async(req,res)=>{
    try{
        // fetch data from req
        const{email,password}=req.body;
        // check all provided or not
        if(!email||!password){
           return res.status(401).json({
                success:false,
                message:"Please provide all the needed information "
            })
        }

        // check that user entry present in database or not
        let User=await user.findOne({email});
        if(!User){
            return res.status(400).json({
                success:false,
                message:"User not present first register then try to log in "
            })
        }


        // payload
        const payload={
            email:User.email,
            id:User._id,
            role:User.role
        }
        // verify the password
        if(await bcrypt.compare(password,User.password)){

            // if password is match then make the token
            let token=jwt.sign(payload,process.env.SECRET_KEY,
                {
                    expiresIn:"2h"
                }
            )
            User=User.toObject();
            console.log(User);
            User.token=token;
            console.log(User);
            User.password=undefined;

            console.log(User);
            // option for cookies
            const options={
                expire:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }

            // send token in cookies
            res.cookie("token_name",token,options).status(200).json({
                success:true,
                token,
                User,
                message:"Successfully login"
            })
        }
        else{
            return res.status(300).json({
                success:false,
                message:"Wrong password Please enter correct password"
            })
        }
    }
    catch(error){
        res.status(400).json({
                success:false,
                message:"Something went wrong while login",
                error:error.message
             });
    }
}