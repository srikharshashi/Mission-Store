const router = require('express').Router();
const Mission = require('../../models/mission');

router.get('/all', async (req, res) => {

  try {
    const mission = await Mission.find();
    let missionList = [];

    for (let mi of mission) {
      missionList.push({
        name: mi.name,
        description: mi.description
      });
    }

    return res.json( missionList );
  } catch (e) {
    console.log("Error in Mission Query " + e.toString());
    return res.status(500).json({ message: e.toString() });
  }

});

router.get('/:name', async (req, res) => {


  try {
    const mission = await Mission.findOne({ name: req.params.name }).exec();
    console.log(JSON.parse(mission.waypoints));
    if (mission == null) {
      console.log("Mission Not Found!!");
      return res.status(404).json({ message: "Mission not found" });
    }
    return res.json(mission);

  } catch (error) {
    console.log("Error in Mission Query " + e.toString());
    return res.status(500).json({ message: e.toString()});

  }
});



module.exports = router;