const express = require('express');
const router = express.Router();
const waterStationDao = require("../dao/WaterStationDao");


router.get("/api/water-station/get-all", function (req, res) {
    waterStationDao.getAllWaterStation(function (result) {
        if (result != null) {
            res.status(200).end(JSON.stringify(result));
        } else {
            res.status(404).json({ result: null });
        }
    })
});

router.get("/api/water-station/get", function (req, res) {
    var id = req.query.id;
    waterStationDao.getWaterStationById(id, function (result) {
        if (result != null) {
            res.status(200).end(JSON.stringify(result));
        } else {
            res.status(404).json({ result: null });
        }
    })
});

router.post("/api/water-station/create", function (req, res) {
    console.log(req.body);
    waterStationDao.createWaterStation(req.body, function (result) {
        if (result != null) {
            res.status(200).end(JSON.stringify(result));
        } else {
            res.status(404).json({ result: null });
        }
    })
});

router.put("/api/water-station/update", function (req, res) {
    var waterStation = req.body;
    console.log(waterStation);
    waterStationDao.updateWaterStation(waterStation, function (result) {
        if (result != null) {
            res.status(200).end(JSON.stringify(result));
        } else {
            res.status(404).json({ result: null });
        }
    })

});

router.delete("/api/water-station/delete", function(req, res){
    var waterStation = req.body;
    waterStationDao.deleteWaterStation(waterStation.water_id, function(result){
        if (result != null) {
            res.status(200).end(JSON.stringify(result));
        } else {
            res.status(404).json({ result: null });
        }
    });
});


module.exports = router;

