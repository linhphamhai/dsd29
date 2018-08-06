const sensorDao = require("../dao/SensorDao");
const express = require('express');
const router = express.Router();


router.post("/api/sensor/create", function (req, res) {
    var sensor = req.body;
    sensorDao.addNewSensor(sensor, function (result) {
        if (result != null) {
            res.json({ state: 'YES' });
        } else {
            res.json({ state: 'NO' });
        }
    })
});

router.put("/api/sensor/update", function (req, res) {
    var sensor = req.body;
    sensorDao.updateSensor(sensor, function (result) {
        if (result != null) {
            res.json({ state: 'YES' });
        } else {
            res.json({ state: 'NO' });
        }
    })
});

router.delete("/api/sensor/delete", function (req, res) {
    var sensor_id = req.body.sensor_id;
    sensorDao.deleteSensor(sensor_id, function (result) {
        if (result != null) {
            res.json({ state: 'YES' });
        } else {
            res.json({ state: 'NO' });
        }
    })
});


router.get("/api/sensor/get-all", function (req, res) {
    sensorDao.getAllSensor(function (result) {
         res.json(result);
    })
});

router.get("/api/sensor/get", function (req, res) {
    var sensor_id = req.query.sensor_id;
    sensorDao.getSensorById(sensor_id, function (result) {
         res.json(result);
    })
});



module.exports = router;