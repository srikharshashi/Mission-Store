const router=require('express').Router();
const uploadImagesRouter=require('./uploadImage');
const queryImages=require('./queryImages');


router.use('/upload',uploadImagesRouter);
router.use('/query',queryImages);



module.exports= router;
