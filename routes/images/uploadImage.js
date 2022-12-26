const router = require('express').Router();
const Image = require('../../models/image');
const Mission = require('../../models/mission');

router.post('/addall', async (req, res) => {
    const body = req.body;

    if (body.length == 0) return res.status(400).json({ message: "No parameters found" });

    try {
        const savedMission = await Image.insertMany(body);
        return res.json(savedMission);
    } catch (e) {
        console.log("Error in Image Create " + e.toString());
        return res.status(500).json({ message: e.toString() });
    }

});




module.exports = router;