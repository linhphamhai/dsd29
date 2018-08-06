var pool = require('../config/db');
var treeDao = require("../dao/TreeDao")

var historyDetailDao = {

    getAllDayOfWork: function (staff_id, callback) {
        var sql = "SELECT * FROM ";
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

    getAllHistoryInMonth: function (staff_id, callback) {
        var sql = "SELECT history_detail.id, history_detail.tree_id, history_detail.time, history_detail.volume, tree.tree_name FROM history_detail, tree WHERE tree.tree_id = history_detail.tree_id AND MONTH(history_detail.time) =  MONTH(CURRENT_DATE())  AND YEAR(history_detail.time) =  YEAR(CURRENT_DATE())  AND history_detail.staff_id = " + staff_id + " ORDER BY history_detail.time DESC";
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    var myFinalResult = [];
                    var temp;
                    for (var i = 0; i < result.length; i++) {
                        var element = result[i];
                        temp = element;
                        var s = new Date(element.time).toISOString();
                        temp.time = s.substring(0, 10) + " " + s.substring(11, 19);
                        myFinalResult.push(temp);
                    }
                    callback(myFinalResult);
                }
            });
        } catch (error) {
            callback(null);
        }
    },


    getAllHistoryOfTree: function (tree_id, callback) {
        var sql = "SELECT history_detail.id, history_detail.tree_id, history_detail.staff_id, history_detail.time, history_detail.volume, staff.staff_name FROM history_detail, staff "
         + " WHERE history_detail.staff_id = staff.staff_id AND history_detail.tree_id = " + tree_id;
        console.log(sql);
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

    addNewWorkHistory: function (data, callback) {
        console.log(data);
        if (data.volume > 0) {
            treeDao.updateCurrentWater(data.tree_id, data.volume, function (result) {
                console.log(result);
                treeDao.unblockTree(data.tree_id);
            });
        }
        var sql = "INSERT INTO history_detail(tree_id, staff_id, volume) VALUES(" +
            data.tree_id + ", " + data.staff_id + ", '" + data.volume + "');";
        console.log(sql);
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
    }
}

module.exports = historyDetailDao;