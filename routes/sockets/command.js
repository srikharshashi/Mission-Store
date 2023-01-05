const router=require('express').Router();
const WSS=require('../../index');



router.ws('/',(ws,req)=>{
    const device= req.query.device;
    console.log("connected to ws /command");
    console.log(`device is ${device}`);

    if(device==='drone') droneConnected=true;
    else if(device==="phone") phoneConnected=true;

    ws.on('message',(msg)=>{
            let {message,status}=JSON.parse(msg);
            
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
                    WSS.getWss().clients.forEach((client)=>{
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({command:"LAUNCH"}));
                          }
                    })
                }
            }

    });


    ws.id=device;

    ws.on('close',(msg)=>{
        console.log("closed connection with "+ws.id);
        if(device==='drone') droneConnected=false;
        else if(device==="phone") phoneConnected=false;
    });

});


module.exports= router;



// SO basically there are 