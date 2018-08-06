var pool = require('../config/db');

var SensorDao = {

    getAllSensor: function (callback) {
        var sql = "SELECT * FROM sensor WHERE sensor_state = 1 ORDER BY sensor_id ASC";
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    callback(result);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    getSensorById: function (id, callback) {
        var sql = "SELECT * FROM sensor WHERE sensor_id = " + id;
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    callback(result);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    deleteSensor: function (id, callback) {
        var sql = "UPDATE sensor SET sensor_state = 0 WHERE sensor_id = " + id;
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    callback(result);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    updateSensor: function (sensor, callback) {
        var sql = "UPDATE sensor SET sensor_name ='" + sensor.sensor_name + "', sensor_detail = '" + sensor.sensor_detail + "', current_tree_id = " + sensor.current_tree_id +
            " WHERE sensor_id = " + sensor.sensor_id;
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    callback(null);
                } else {
                    callback(result);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    addNewSensor: function (sensor, callback) {
        var sql = "INSERT INTO sensor(sensor_name, sensor_detail, current_tree_id) "
            + " VALUES('" + sensor.sensor_name + "', '" + sensor.sensor_detail + "', " + sensor.current_tree_id + ");";
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    callback(result);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    getIdOfTreeBySensor: function (sensorId, callback) {
        var sql = "SELECT current_tree_id FROM sensor WHERE sensor_id = " + sensorId;
        console.log(sql);
        try {
            pool.query(sql, function (err, result) {
                console.log(result);
                if (err || result.length == 0) {
                    callback(null);
                } else {
                    callback(result[0].current_tree_id);
                }
            });
        } catch (error) {
            callback(null);
        }
    }
}

module.exports = SensorDao;

SensorDao.getIdOfTreeBySensor(1, function (result) {
    console.log(result);
})