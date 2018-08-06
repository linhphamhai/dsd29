var pool = require('../config/db');

var treeTypeDao = {

    getAllTreeType: function (callback) {
        var sql = "SELECT * FROM tree_type";
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    callback(result);
                }
            });
        } catch (error) {

        }
    },

    getTreeTypeById: function (id, callback) {
        var sql = "SELECT * FROM tree_type WHERE type_id = " + id;
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

    updateTreeType: function (data, callback) {
        var sql = "UPDATE tree_type SET type_name = '" + data.type_name + "', standard_temperature = " + data.standard_temperature
            + ", standard_humidity = " + data.standard_humidity + ", standard_water = " + data.standard_water + " WHERE type_id = " + data.type_id;
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

    createTreeTpye: function (data, callback) {
        var sql = "INSERT INTO tree_type(type_name, standard_temperature, standard_humidity, standard_water) "
            + "VALUES('" + data.type_name + "', " + data.standard_temperature + ", " + data.standard_humidity + ", " + data.standard_water + ")";
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

    deleteTreeType: function (type_id, callback) {
        var sql = "UPDATE tree_type SET state = 0 WHERE  type_id = " + type_id;
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


}

module.exports = treeTypeDao;