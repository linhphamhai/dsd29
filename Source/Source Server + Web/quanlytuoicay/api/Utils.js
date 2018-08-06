const express = require('express');
const router = express.Router();
const waterStationDao = require("../dao/WaterStationDao");
const treeDao = require("../dao/TreeDao");



function getWaterStationNearStaff(x, y, callback){
    waterStationDao.getAllWaterStation(function(waterStations){
        var currentWaterStation = waterStations[0];
        for(var i = 1; i < waterStations.length; i ++){
            var cDX = currentWaterStation.x - x;
            var cDY = currentWaterStation.y - y;
            var dX = waterStations[i].x - x;
            var dY = waterStations[i].y - y;
            if(dY * dY + dX * dX < cDX * cDX + cDY * cDY){
                currentWaterStation = waterStations[i];
            }
        }
        callback(currentWaterStation);
    });
}

function getAllTreeNearWaterStation(x, y, callback){
    treeDao.getAllTreeByWater(function(trees){
        var lstTrees = [];
        for(var i = 0; i < trees.length; i++ ){
            var currentTree = trees[i];
            if(currentTree.x - x >= -6 && currentTree.x - x <= 6 && currentTree.y - y >= -6 && currentTree.y - y <= 6 ){
                lstTrees.push(currentTree);
            }
            if(lstTrees.length <= 1){
                lstTrees = [];
                if(currentTree.x - x >= -8 && currentTree.x - x <= 8 && currentTree.y - y >= -8 && currentTree.y - y <= 8 ){
                    lstTrees.push(currentTree);
                }
            }
            if(lstTrees.length <= 1){
                lstTrees = [];
                if(currentTree.x - x >= -10 && currentTree.x - x <= 10 && currentTree.y - y >= -10 && currentTree.y - y <= 10 ){
                    lstTrees.push(currentTree);
                }
            }
        }
        callback(lstTrees);
    });
}

function treeSort(lstTrees, maximum,  callback){
    var result = [];
    var total = 0;
    for(var i = 0; i < lstTrees.length; i ++){
        if(total < maximum){
            total += lstTrees[i].current_water;
            var element = lstTrees[i];
            result.push(element);
            treeDao.blockTree(lstTrees[i].tree_id);
        }else{
            break;
        }
    }
    callback(result);
}

function  getTreeAndWaterForStaff (x, y, maximum, callback){
    try {
        getWaterStationNearStaff(x, y, function(waterStation){
            getAllTreeNearWaterStation(x, y, function(lstTrees){
                treeSort(lstTrees, maximum, function(result){
                    callback({waterStation : waterStation, trees : result});
                })
            });
        });
    } catch (error) {
        callback(null);
    }
}

module.exports = {getTreeAndWaterForStaff, getWaterStationNearStaff}