var pool = require('../config/db');
var TreeDao = require("./TreeDao");


function deleteLock (lock_id){
    var sql = "UPDATE tree_lock SET enabled = 0 WHERE id = " + lock_id
    try {
        pool.query(sql, function (err, result) {
        });
    } catch (error) {
    }
}

function unblockTree (tree_id) {
    var sql = "UPDATE tree SET is_blocking = 0 WHERE tree_id = " + tree_id;
    try {
        pool.query(sql, function (err, result) {
        });
    } catch (error) {
    }
}


var TreeLockDao = {
    addNew: function (tree_id) {
        var time = (new Date()).getTime();
        console.log(time);
        var sql = "insert into tree_lock(tree_id, time) VALUES(" + tree_id + "," + time + ");"
        try {
            pool.query(sql, function (err, result) {
            });
        } catch (error) {
        }
    },

    unLock : function(){
        var limitTime = (new Date()).getTime() - 15 * 60 * 1000;
        var sql = "SELECT * FROM tree_lock WHERE enabled = 1 AND time < " + limitTime;
        console.log(sql);
        try {
            pool.query(sql, function (err, result) {
                console.log(result);
                result.forEach(element => {
                    var id = element.id;
                    deleteLock(id);
                    var tree_id = element.tree_id;
                    unblockTree(tree_id);
                });
            });
        } catch (error) {
        }
    },

    deleteLock2: function  (tree_id){
        var sql = "UPDATE tree_lock SET enabled = 0 WHERE tree_id = " + tree_id;
        try {
            pool.query(sql, function (err, result) {
            });
        } catch (error) {
        }
    }

}


module.exports = TreeLockDao;