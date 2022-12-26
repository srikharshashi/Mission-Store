// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser=require('body-parser');
const missionsRoute=require('./routes/missions/missionsRouter');
const imagesRoute= require('./routes/images/imagesRouter');
const flightsRoute=require('./routes/flights/flightsRouter');


//ESTABLISH A DB CONNECTION
mongoose.connect(process.env.DB_URL,()=>{
    console.log("DB Connection Success");
});


//CREATE THE APP AND WEBSOCKET SERVER
const app= express();
var expressWs = require('express-ws')(app);


//REGISTER THE MIDDLE WARES
app.use(bodyParser.json());
app.use('/mission',missionsRoute);
app.use('/image',imagesRoute);
app.use('/flight',flightsRoute);



// ROUTES

app.get("/",(req,res)=>{
    res.send("<h1>We are on home</h1>");
    
});

app.ws('/status', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg);
      ws.send(msg);
    });
  });
  
  app.ws('/control', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg);
      ws.send(msg);
    });
  });


app.listen(4000,()=>console.log("Server listening on 4000"));
