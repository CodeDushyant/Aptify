const express = require('express');
const app=express();


// port from .env
require('dotenv').config();
const PORT=process.env.PORT||3300;

// middleware bodyparser for put or post request
app.use(express.json());


// import routes for examination website
const examRoutes=require("./routes/mainRoutes");
app.use('/api/v1',examRoutes);
app.listen(PORT,()=>{
    console.log("App running ");
});

// connect to database
const dbConnect=require('./config/database');
dbConnect();


// default route
app.get('/',(request,response)=>{
    response.send("<h1>Hello inside h1 tag</h1>");
});


app.get('/car',(req,res)=>{
    res.send("hello car");
});


