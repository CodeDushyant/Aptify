const mongoose=require('mongoose');
require('dotenv').config();
const dbConnect= async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB COnnect successfully");
    }
    catch(error){
        console.log("Issue find");
        console.error(error.message);
        process.exit(1);
    }
}

module.exports=dbConnect;