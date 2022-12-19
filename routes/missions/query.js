const router=require('express').Router();


router.get('/all',async (req,res)=>{
  
  try{
    const mission = await Mission.find();
    let missionList=[];
    
    for (let mi of mission) {
      missionList.append({
        name:mi.name,
        description:mi.description 
      });
    }
    
    return res.json({missions:missionList});
  }catch(e){
    console.log("Error in Mission Query "+e.toString());
    return res.status(500).json({message:e.toString()});
  }
  
});

router.get('/:name',async(req,res)=>{


  try {
    const mission= await Mission.findOne({name:name}).exec();
    if(misssion==null){
    console.log("Mission Not Found!!");
    return res.status(404).json({message:"Mission not found"});
    }
    return res.json({mission:mission});
    
  } catch (error) {
        console.log("Error in Mission Query "+e.toString());
    return res.status(500).json({message:e.toString()});

  }
});



module.exports=router;