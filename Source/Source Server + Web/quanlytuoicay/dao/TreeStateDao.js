var pool = require('../config/db');

var treeStateDao = {
    updateStateOfTree: function (tree_state, callback) {
        var sql1 = "INSERT INTO tree_state(tree_id, tree_state, tree_description, tree_state_image) VALUES("
            + tree_state.tree_id + ", '" + tree_state.tree_state + "', '" + tree_state.tree_description + "', '"
            + tree_state.tree_state_image + "');";
        try {
            pool.query(sql1, function (err, result) {
                if (result != null) {
                    callback(result);
                } else {
                    callback({ result: "NO" })
                }
            });
        } catch (error) {
            callback({ result: "NO" })
        }
    },

    getNotification : function(comfirmed, callback){
        var sql1 = "SELECT * FROM tree_state WHERE comfirmed = " + comfirmed;
        try {
            pool.query(sql1, function (err, result) {
                callback(result);
            });
        } catch (error) {
            callback([]);
        }
    },

    confirmNotification : function(id, callback){
        var sql1 = "update tree_state SET comfirmed = 1 WHERE id = " + id;
        try {
            pool.query(sql1, function (err, result) {
                callback(result);
            });
        } catch (error) {
            callback(null);
        }
    },
}


module.exports = treeStateDao;