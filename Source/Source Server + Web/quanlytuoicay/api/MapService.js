const MapDao = require("../dao/MapDao");
const TreeDao = require("../dao/TreeDao");
const WaterDao = require("../dao/WaterStationDao");
const express = require('express');
const router = express.Router();


router.get("/api/map/get-map", function (req, res) {
    MapDao.getMap(function (result) {
        res.end(result);
    })
});

router.get("/api/map/get-map-json", function (req, res) {
    MapDao.getMapJson(function(result){
        res.end(JSON.stringify(result));
    });
});

router.get("/api/map/get-map-web", function (req, res) {
    var result = [];
    MapDao.getMapArray(function (location) {
        for (i = 0; i < 50; i++) {
            var row = [];
            for (j = 0; j < 50; j++) {
                var value = location[j][i];
                if (value == '1') {
                    // console.log("asddddddddddddddd        " + value);
                    TreeDao.getIdTreeByLocation(j, i, function (id) {
                        var obj = { id: id, value: value };
                        // console.log(obj);
                        row.push(obj);
                    });
                } else if (value == '4') {
                    WaterDao.getIdWSByLocation(j, i, function (id) {
                        var obj = { id: id, value: value };
                        // console.log(obj);
                        row.push(obj);
                    });
                } else {
                    var obj = { id: -1, value: value };
                    // console.log(obj);
                    row.push(obj);
                }
            }
            result.push(row);

        }
        var finalResult = [];
        for (i = 0; i < 50; i++) {
            var row = [];
            for (j = 0; j < 50; j++) {
                row.push(result[j][i]);
            }
            finalResult.push(row);
        }
        res.end(JSON.stringify(finalResult))
    })
})

router.get("/api/map/check_invalid_location/:x/:y", function(req, res){
    var data = {
        "location": {
            "x": req.params.x,
            "y": req.params.y
        }
    };
    MapDao.getInfoLocationByXY(data.location.x, data.location.y, function(result){
        res.end(JSON.stringify(result[0]));
    }) 
});

router.put("/api/map/update", function(req, res){
    console.log(req.body);
    MapDao.updateLocation(req.body.x, req.body.y, req.body.value, function(err,result){
        if(err){
            res.status(501).json({state : 'NO'});
        }else{
            res.status(200).json({state : 'YES'});
        }
    });
});

module.exports = router;