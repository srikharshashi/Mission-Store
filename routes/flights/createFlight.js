const router=require('express').Router();
const Flight=require('../../models/flight');

router.post('/',async (req,res)=>{
  const body=req.body;


  if(!body["mission_id"] || !body["date"] )
      return res.status(400).json({message:"Bad Request Required Parameters Not found"});

  try{
    const newFlight= new Flight(req.body);
    const savedFlight=await newFlight.save();
    return res.json(savedFlight);
  }catch(e){
    console.log("Error in Flight Create "+e.toString());
    return res.status(500).json({message:e.toString()});
  }
  
});




module.exports=router;