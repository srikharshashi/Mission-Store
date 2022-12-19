const router=require('express').Router();
const createMissionsRoute=require('./create-missions.js');
const getMissions=require();

router.use('/create',createMissionsRoute);
router.use('/query',getMissions);



module.exports= router;
