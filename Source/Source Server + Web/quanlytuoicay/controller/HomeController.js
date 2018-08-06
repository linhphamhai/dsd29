const express = require('express');
var router = express.Router();
var historieDetailDao = require("../dao/HistoryDetailDao");
var treeDao = require("../dao/TreeDao");
var TreeDao = require("../dao/TreeDao");
var WaterDao = require("../dao/WaterStationDao");
var MapDao = require("../dao/MapDao");
var treeTypeDao = require("../dao/TreeTypeDao");
var waterStationDao = require("../dao/WaterStationDao");

router.get("/home", function (req, res) {
    treeDao.getAllTree(function (trees) {
        waterStationDao.getAllWaterStation(function (ws) {
            // console.log(ws);
            MapDao.getRocks(function (rocks) {
                treeTypeDao.getAllTreeType(function (treeTypes) {
                    // console.log(treeTypes);
                    var dataMap = [];
                    for (i = 0; i < trees.length; i++) {
                        dataMap.push(trees[i]);
                    }
                    for (i = 0; i < ws.length; i++) {
                        dataMap.push(ws[i]);
                    }
                    for (i = 0; i < rocks.length; i++) {
                        dataMap.push(rocks[i]);
                    }
                    // console.log(dataMap.length);
                    // console.log(dataMap);
                    var finalDataMap = [];
                    var countTreWaterSquare = 0;
                    var countRoads = 0;
                    for (i = 0; i < 50; i++) {
                        var row = [];
                        for (j = 0; j < 50; j++) {
                            for (k = 0; k < dataMap.length; k++) {
                                var obj = {};
                                obj["x"] = j;
                                obj["y"] = i;
                                if (dataMap[k].x == j && dataMap[k].y == i) {
                                    countTreWaterSquare++;

                                    if (dataMap[k].tree_id != null) {
                                        obj["id"] = dataMap[k].tree_id;
                                        obj["value"] = 1;
                                        obj["name"] = dataMap[k].tree_name;
                                        obj["water"] = dataMap[k].current_water;
                                        obj["current_state"] = dataMap[k].current_state;
                                        obj['tree_state'] = dataMap[k].tree_state;
                                        obj['tree_type'] = dataMap[k].tree_type;
                                    } else if (dataMap[k].water_id != null) {
                                        obj["id"] = dataMap[k].water_id;
                                        obj["name"] = dataMap[k].water_name;
                                        obj["x"] = dataMap[k].x;
                                        obj["y"] = dataMap[k].y;
                                        obj["state"] = dataMap[k].state;
                                        obj["value"] = 4;
                                        obj["location"] = dataMap[k].water_location;
                                    } else {
                                        obj["id"] = dataMap[k].id;
                                        obj["value"] = 2;
                                    }
                                    row.push(obj);
                                    break;
                                }
                                if (k == dataMap.length - 1) {
                                    countRoads++;
                                    obj["id"] = -1;
                                    obj["value"] = 0;
                                    row.push(obj);
                                }
                            }
                        }
                        finalDataMap.push(row);
                    }
                    var data = { trees: trees, ws: ws, title: "Bản đồ cây Bách Khoa", arrayMap: finalDataMap, treeTypes: treeTypes };
                    res.render("home", data);

                });
            });
        });
    });
});


router.get("/sensor-data", function (req, res) {
    res.render("sensor-data");
});

router.get("/upload-tree-state", function (req, res) {
    res.render("upload-tree");
});

router.get("/histories-water-by-tree", function (req, res) {
    var tree_id = req.query.tree_id;
    historieDetailDao.getAllHistoryOfTree(tree_id, function (result) {
        console.log(result);
        res.render("histories-water-by-tree", { data: result, title: "Lịch sử tưới ứng với mỗi cây" });
    });
});


router.get("/notification", function (req, res) {
    res.render("notification");
});


router.get("/test-socket", function (req, res) {
    res.render("test");
});


module.exports = router;