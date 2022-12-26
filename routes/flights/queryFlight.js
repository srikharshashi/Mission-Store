const router = require('express').Router();
const Flight = require('../../models/flight');

router.get('/', async (req, res) => {
    try {
        const flight = await Flight.find();
        return res.json(flight);
    } catch (e) {
        console.log("Error in Flight Query " + e.toString());
        return res.status(500).json({ message: e.toString() });
    }

});

router.get('/:id', async (req, res) => {
    try {
        const flight = await Flight.findOne({ _id: req.params.id }).exec();
        if (flight == null) {
            console.log("Flight Not Found!!");
            return res.status(404).json({ message: "Flight not found" });
        }
        return res.json(flight);

    } catch (error) {
        console.log("Error in Flight Query " + e.toString());
        return res.status(500).json({ message: e.toString() });

    }
});



module.exports = router;