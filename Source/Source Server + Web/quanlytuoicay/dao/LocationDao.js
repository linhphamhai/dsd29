var pool = require('../config/db');

var LocationDao = {

    getAllLocation: function (callback) {
        var sql = "SELECT staff_id, name staff_name, x, y FROM guest_location WHERE enable = 1";
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(false);
                } else {
                    callback(result);
                }
            });
        } catch (error) {
            callback(false);
        }
    },

    updateLocation: function (socket_id, staff_id, name, x, y, callback) {
        var sql = "UPDATE guest_location SET x = " + x + ", y =" + y + ", name ='" + name + "', staff_id = " + staff_id + ", enable = 1 " + " WHERE socket_id ='" + socket_id + "'";
        console.log(sql);
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(false);
                } else {
                    callback(true);
                }
            });
        } catch (error) {
            callback(false);
        }
    },

    deleteLocation : function (socket_id, callback){
        var sql = "DELETE FROM guest_location WHERE socket_id ='" + socket_id + "'";
        console.log(sql);
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(false);
                } else {
                    callback(true);
                }
            });
        } catch (error) {
            callback(false);
        }
    },

    addNewLocation : function(socket_id, callback){
        var sql = "INSERT INTO guest_location(socket_id,x,y) VALUES('" +socket_id + "', -1, -1)" ;
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(false);
                } else {
                    callback(true);
                }
            });
        } catch (error) {
            callback(false);
        }
    }

}

LocationDao.getAllLocation(function(result){
    console.log(result);
})

module.exports = LocationDao;