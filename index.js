// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const {WebSocket}= require('ws');


//CREATE THE APP AND WEBSOCKET SERVER
const app= express();
var expressWs = require('express-ws')(app);




const bodyParser=require('body-parser');
const missionsRoute=require('./routes/missions/missionsRouter');
const imagesRoute= require('./routes/images/imagesRouter');
const flightsRoute=require('./routes/flights/flightsRouter');
const socketRoute=require('./routes/sockets/socketsRouter');


//ESTABLISH A DB CONNECTION
mongoose.connect(process.env.DB_URL,()=>{
    console.log("DB Connection Success");
});




//REGISTER THE MIDDLE WARES
app.use(bodyParser.json());
app.use('/mission',missionsRoute);
app.use('/image',imagesRoute);
app.use('/flight',flightsRoute);
// app.use('/socket',socketRoute);


// ROUTES

app.get("/",(req,res)=>{
    res.send("<h1>We are on home</h1>");
    
});



let phoneConnected=false;
let droneConnected=false;
let droneInFlight=true;


app.ws('/socket/command',(ws,req)=>{
  const device= req.query.device;
  console.log("connected to ws /command");
  console.log(`device is ${device}`);

  if(device==='drone') droneConnected=true;
  else if(device==="phone") phoneConnected=true;

  ws.on('message',(msg)=>{
          msg=JSON.parse(msg);
          let {message,status}=msg;
          
          if(message==="can_launch"){
              if(droneConnected && phoneConnected){
                  console.log("dif "+droneInFlight);

                  if(!droneInFlight){
                      ws.send(JSON.stringify({"reply":true}));
                  }else{
                      ws.send(JSON.stringify({"reply":false}));
                  }
              }else{
                  ws.send(JSON.stringify({"reply":false}));
              }
          }

          else if(message==='gs_update'){
              if(status==="armed"){
                  console.log("Drone is Armed");
                  droneInFlight=true;
              }
              else if(status==="unarmed"){
                  console.log("Drone is Unarmed");

                  droneInFlight=false;
              }
          }

          else if(message==='LAUNCH'){
              if(!droneInFlight && droneConnected){
                  droneInFlight=true;
                  let {waypoints}=msg;
                  expressWs.getWss().clients.forEach((client)=>{
                      if (client !== ws && client.readyState === WebSocket.OPEN) {
                          client.send(JSON.stringify({command:"LAUNCH",waypoints}));
                        }
                  })
              }
          }

          else if(message=="location_update"){
            let {lat,long}=msg;
            expressWs.getWss().clients.forEach((client)=>{
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({message:"location_update",lat,long}));
                  }
            });
          }

  });


  ws.id=device;

  ws.on('close',(msg)=>{
      console.log("closed connection with "+ws.id);
      if(device==='drone') droneConnected=false;
      else if(device==="phone") phoneConnected=false;
  });

});



app.listen(parseInt(process.env.PORT),()=>console.log("Server listening on 4000"));






