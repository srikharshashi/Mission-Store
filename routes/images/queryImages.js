const image = require('../../models/image');

const router=require('express').Router();

router.get('/', async (req,res)=>{
    try {
        const ImgList= await image.find();
        return res.json(ImgList);
    } catch (error) {
        res.status(500).json({message:`$error.toString()`});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const img = await image.find({ flight_id: req.params.id }).exec();
        if (img == null) {
            console.log("Image Not Found!!");
            return res.status(404).json({ message: "Image not found" });
        }
        return res.json(img);
    } catch (error) {
        console.log("Error in Image Query " + e.toString());
        return res.status(500).json({ message: e.toString() });

    }
});


module.exports= router;
