const express = require('express');
var router = express.Router();
var SensorDao = require("../dao/SensorDao");


router.get('/sensors/:page', function (req, res) {
    var data = [];
    var page = req.params.page;

    SensorDao.getAllSensor(function (sensors) {
        var start = (page - 1) * 20;
        var end = page * 20;
        for (var i = start; i < end && i < sensors.length; i++) {
            data.push(sensors[i]);
        }
        console.log(data)
        res.render("sensors", {
            sensors:data,
            title: "Danh sách các sensor"
        });
    });


});


module.exports = router;