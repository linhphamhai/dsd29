const sensorDao = require("../dao/SensorDataDao");
const express = require('express');
const router = express.Router();
const sensorDataDao = require("../dao/SensorDataDao");

router.get("/api/sensor-data", function(req, res){
    var tree_id = req.query.tree_id;
    console.log("Service  " + tree_id)
    sensorDataDao.getDataOfTree(parseInt(tree_id +""), function(result){
        console.log("Service2")
         res.json(result);
    });
});

router.get("/api/mobile-sensor-data", function(req, res){
    var tree_id = req.query.tree_id;
    console.log("Service  " + tree_id)
    sensorDataDao.getDataOfTree(parseInt(tree_id +""), function(result){
        console.log(result)

         var humidities = [];
         result.humidities.forEach(element => {
             var obj ={};
             obj.time = element[0];
             obj.humidity = element[1];
             humidities.push(obj);
         });
         var temperatures = [];
         result.temperatures.forEach(element => {
            var obj ={};
            obj.time = element[0];
            obj.temperature = element[1];
            temperatures.push(obj);
        });
         res.json(({humidities : humidities, temperatures : temperatures}));
    });
});

// sensorDataDao.getDataOfTree("2", function(tr){
//     console.log(tr);
// })

module.exports = router;