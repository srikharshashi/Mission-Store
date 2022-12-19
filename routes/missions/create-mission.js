const router=require('express').Router();


router.post('/',async (req,res)=>{
  const body=req.body;


  if(!body["name"] && !body["description"] && !body["waypoints"])
      return res.status(400).json({message:"Bad Request Required Parameters Not found"});

  try{
    const newMission= new Mission(req.body);
    const savedMission=await newMission.save();
    return res.json(savedMission);
  }catch(e){
    console.log("Error in Mission Create "+e.toString());
    return res.status(500).json({message:e.toString()});
  }
  
});




module.exports=router;