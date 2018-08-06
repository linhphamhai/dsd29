var pool = require('../config/db');
var MapDao = require("./MapDao");
var waterStationDao = {

    updateWaterStation: function (waterStation, callback) {
        var sql = "UPDATE water_station set water_name = '" + waterStation.water_name + "', water_location = '"
            + waterStation.water_location + "', x = " + waterStation.water_x + ", y = " + waterStation.water_y + ", state = " + waterStation.water_state
            + " WHERE water_id = " + waterStation.water_id;
        console.log(sql);
        this.getWaterStationById(waterStation.water_id, function (ws) {
            var currentX = ws[0].x;
            var currentY = ws[0].y;
            MapDao.updateLocation(currentX, currentY, 0);
        });
        pool.query(sql, function ( result) {
            MapDao.updateLocation(waterStation.water_x, waterStation.water_y, 4);
            callback(result);
        });
    },

    createWaterStation: function (waterStation, callback) {
        var sql = "INSERT INTO water_station(water_name, water_location, x, y) VALUES('" + waterStation.water_name + "', '" + waterStation.water_location
            + "',  " + waterStation.water_x + ", " + waterStation.water_y + " );";
        try {
            pool.query(sql, function (err, result) {
                if (result != null) {
                    MapDao.updateLocation(waterStation.x, waterStation.y, 4);
                    callback(result);
                } else {
                    callback(null)
                }
            });
        } catch (error) {
            callback(null)
        }
    },

    deleteWaterStation: function (waterStationId, callback) {
        var sql = "UPDATE water_station SET state = 0 WHERE water_id = " + waterStationId;
        try {
            pool.query(sql, function (err, result) {
                if (result != null) {
                    this.getWaterStationById(waterStationId, function (ws) {
                        var currentX = ws[0].x;
                        var currentY = ws[0].y;
                        MapDao.updateLocation(currentX, currentY, 0);
                    })
                    callback(result);
                } else {
                    callback(null)
                }
            });
        } catch (error) {
            callback(null)
        }
    },

    getAllWaterStation: function (callback) {
        var sql = "SELECT * FROM water_station WHERE state = 1";
        try {
            pool.query(sql, function (err, result) {
                if (result != null) {
                    callback(result);
                } else {
                    callback(null);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    getWaterStationById: function (waterStationId, callback) {
        var sql = "SELECT * FROM water_station WHERE water_id = " + waterStationId;
        try {
            pool.query(sql, function (err, result) {
                if (result != null) {
                    callback(result);
                } else {
                    callback(null);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    getIdWSByLocation: function (x, y, callback) {
        var sql = "SELECT water_id FROM water_station WHERE x = " + x + " AND y =" + y;
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    if (result.length > 0) {
                        callback(result[0].water_id);
                    }
                }
            });
        } catch (error) {

        }
    },
}

module.exports = waterStationDao;