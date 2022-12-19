const router=require('express').Router();
const createMissionsRoute=require('./create-mission');
const queryMission=require('./query');


router.use('/create',createMissionsRoute);
router.use('/query',queryMission);



module.exports= router;
