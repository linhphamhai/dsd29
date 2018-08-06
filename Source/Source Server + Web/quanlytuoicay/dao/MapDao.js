var pool = require('../config/db');

var MapDao = {

    getMap: function (callback) {
        var sql = "SELECT * FROM map ORDER BY id ASC";
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    var kq = [];
                    for (i = 0; i < 50; i++) {
                        var row = [];
                        for (j = 0; j < 50; j++) {
                            row.push(result[i * 50 + j].value);
                        }
                        kq.push(row);
                    }
                    if (kq != null) {
                        var result = "";
                        kq.forEach(element => {
                            var row = "";
                            element.forEach(function (value) {
                                result = result + value;
                            });
                            result += "\n";
                        });
                        callback(result);
                    }
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    getMapArray: function (callback) {
        var sql = "SELECT * FROM map ORDER BY id ASC";
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    var kq = [];
                    for (i = 0; i < 50; i++) {
                        var row = [];
                        for (j = 0; j < 50; j++) {
                            row.push(result[i * 50 + j].value);
                        }
                        kq.push(row);
                    }
                    callback(kq);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    getMapJson: function (callback) {
        var sql = "SELECT * FROM map ORDER BY id ASC";
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


    writeFile: function (result) {
        var fs = require("fs");
        fs.writeFile("./map.txt", result, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    },

    readFile: function (callback) {
        var fs = require("fs");
        var data = fs.readFileSync("./map.txt");
        var arr = data.toString().split("\n");
        var result = [];
        for (row = 0; row < 50; row++) {
            var r = [];
            for (col = 0; col < 50; col++) {
                r.push(parseInt(arr[row][col]));
            }
            result.push(r);
        }
        callback(result);
    },

    //Lấy danh sách vật cản từ map
    getRocks: function (callback) {
        var sql = "SELECT * FROM map WHERE value = 2";
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

    //Lấy thông tin của 1 phần tử trên map theo x, y
    getInfoLocationByXY(x, y, callback) {
        var sql = "SELECT * FROM map WHERE x = " + x + " AND y=" + y;
        try {
            // console.log(sql);
            pool.query(sql, function (err, result) {
                callback(result);
            });
        } catch (error) {

        }
    },

    updateLocation(x, y, value) {
        var sql = "UPDATE map SET value = " + value + " WHERE x = " + x + " AND y=" + y;
        try {
            console.log(sql);
            pool.query(sql, function (err, result) {
                // console.log(result);
                
            });
        } catch (error) {
            console.log(error);
        }

    }
}

// MapDao.readFile(function (data) {
//     // console.log(data);
// });

// MapDao.getMapArray(function(result){
//     // console.log(result);
// });

module.exports = MapDao;

