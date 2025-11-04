const user = require('../models/userSchema');
const bcrypt=require('bcrypt');

exports.createDesignAdmin=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(req.user.role!='SAdmin'){
            return res.status(400).json({
                success:true,
                message:"Only Super admin create this "
            })
        }
         const existing = await user.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already in use"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      role: "DAdmin"
    });

    return res.status(201).json({
      success: true,
      message: "Design Admin created successfully",
      newUser
    });
    }catch(error){
        res.status(500).json({
            success:true,
            message:"Something went wrong in createDesignAdmin"
        })
    }
}