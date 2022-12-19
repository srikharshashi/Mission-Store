// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser=require('body-parser');
const missionsRoute=require('./routes/missions/missions');



//ESTABLISH A DB CONNECTION
mongoose.connect(process.env.DB_URL,()=>{
    console.log("DB Connection Success");
});


//CREATE THE APP 
const app= express();

//REGISTER THE MIDDLE WARES
app.use(bodyParser.json());
app.use("/posts",postsRoute);


// ROUTES

app.get("/",(req,res)=>{
    res.send("<h1>We are on home</h1>");
    
});





app.listen(4000);
