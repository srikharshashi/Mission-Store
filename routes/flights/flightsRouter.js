const router=require('express').Router();
const createFlight=require('./createFlight');
const queryFlight=require('./queryFlight');


router.use('/upload',createFlight);
router.use('/query',queryFlight);



module.exports= router;