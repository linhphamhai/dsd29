var pool = require('../config/db');
var TreeLockDao = require("./TreeLockDao");
var MapDao = require("./MapDao");
var treeDao = {

    getAllTree: function (callback) {
        var sql = "SELECT tree_id, tree_name, tree_type, current_water, current_state, x, y, tree_state, is_blocking, standard_temperature, standard_humidity, standard_water FROM tree, tree_type WHERE tree_state = 1 AND tree.tree_type = tree_type.type_id";
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

    getAllTreeByType: function (typeId, callback) {
        var sql = "SELECT tree_id, tree_name, tree_type, current_water, current_state, x, y, tree_state, is_blocking, standard_temperature, standard_humidity, standard_water FROM tree, tree_type WHERE tree_state = 1 AND tree.tree_type = tree_type.type_id AND tree.tree_type = " + typeId;
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

    getAllTreeByWater: function (callback) {
        var sql = "SELECT tree_id, tree_name, tree_type, current_water, current_state, x, y, tree_state, is_blocking, standard_temperature, standard_humidity, standard_water FROM tree, tree_type WHERE tree_state = 1 AND tree.tree_type = tree_type.type_id AND is_blocking = 0 AND current_water > 0 ORDER BY current_water DESC";
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

    getTreeById: function (tree_id, callback) {
        var sql = "SELECT * FROM tree WHERE tree_id = " + tree_id;
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

    getTreeObjectById: function (tree_id, callback) {
        var sql = "SELECT tree_id, tree_name, tree_type, current_water, current_state, x, y, tree_state, is_blocking, standard_temperature, standard_humidity, standard_water FROM tree, tree_type WHERE tree_state = 1 AND tree.tree_type = tree_type.type_id AND tree_id = " + tree_id;
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    callback(result[0]);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    updateTree: function (newTree, callback) {
        var sql = "UPDATE tree SET tree_name = '" + newTree.tree_name +
            "', tree_type = " + newTree.tree_type + ", current_water = " + newTree.current_water
            + ", current_state = '" + newTree.current_state + "', x = "
            + newTree.x + ", y = " + newTree.y + ", tree_state = " + newTree.tree_state + " WHERE tree_id = " + newTree.tree_id;
        this.getTreeById(newTree.tree_id, function (trees) {
            var currentX = trees[0].x;
            var currentY = trees[0].y;

            MapDao.updateLocation(currentX, currentY, 0);
            MapDao.updateLocation(newTree.x, newTree.y, 1);
        })
        try {
            pool.query(sql, function (err, result) {
                if (result != null) {
                    // console.log(result);
                    callback(result);
                } else {
                    callback(null);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    createTree: function (newTree, callback) {
        var sql = "INSERT INTO tree(tree_name, tree_type, current_water, current_state, x, y) "
            + " VALUES('" + newTree.tree_name + "', " + newTree.tree_type + ", " + newTree.current_water + ", '"
            + newTree.current_state + "', " + newTree.x + "," + newTree.y + ");";
        try {
            MapDao.updateLocation(newTree.x, newTree.x, 1);
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

    deleteTree: function (tree_id, callback) {
        var sql = "UPDATE tree SET tree_state = 0 WHERE  tree_id = " + tree_id;
        try {
            this.getTreeById(tree_id, function (trees) {
                var currentX = trees[0].x;
                var currentY = trees[0].y;
                MapDao.updateLocation(currentX, currentY, 0);
            })
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

    updateCurrentWater: function (tree_id, water, callback) {
        var sql = "UPDATE tree SET current_water = current_water - " + water + " WHERE tree_id = " + tree_id;
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

    updateCurrentWaterFromSensor: function (data, tree_id, callback) {
        this.getStandardHumidityOfTree(tree_id, function (result) {
            var current_water = (result - data.humidity) * 20;
            var sql = "UPDATE tree SET current_water = " + current_water + " WHERE tree_id = " + tree_id;
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
        });
    },

    getStandardHumidityOfTree: function (tree_id, callback) {
        var sql = "SELECT standard_humidity from tree_type, tree WHERE tree_type.type_id = tree.tree_type AND tree_id = " + tree_id
        try {
            pool.query(sql, function (err, result) {
                if (result != null && result.length != 0) {
                    callback(result[0].standard_humidity);
                } else {
                    callback(null);
                }
            });
        } catch (error) {
            callback(null);
        }
    },

    blockTree: function (tree_id) {
        TreeLockDao.addNew(tree_id);
        var sql = "UPDATE tree SET is_blocking = 1 WHERE tree_id = " + tree_id;
        try {
            pool.query(sql, function (err, result) {
                if (result != null) {
                } else {
                }
            });
        } catch (error) {
        }
    },

    unblockTree: function (tree_id) {
        TreeLockDao.deleteLock2(tree_id);
        var sql = "UPDATE tree SET is_blocking = 0 WHERE tree_id = " + tree_id;
        try {
            pool.query(sql, function (err, result) {
            });
        } catch (error) {
        }
    },

    getIdTreeByLocation: function (x, y, callback) {
        var sql = "SELECT tree_id FROM tree WHERE x = " + x + " AND y =" + y;
        // console.log(sql)
        try {
            pool.query(sql, function (err, result) {
                if (err) {
                    callback(null);
                } else {
                    if (result.length > 0) {
                        // console.log(result[0].tree_id)
                        callback(result[0].tree_id);
                    }

                }
            });
        } catch (error) {

        }
    },


}



module.exports = treeDao;