const router=require('express').Router();


const commandRoute=require('./command');
// const trackRoute=require('./track');


router.use('/command',commandRoute);
// router.use('/track',trackRoute);



module.exports= router;
