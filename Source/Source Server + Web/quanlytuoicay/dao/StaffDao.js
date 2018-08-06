var pool = require('../config/db');

var StaffDao = {
    getAllStaff: function (callback) {
        var sql = "SELECT * FROM staff WHERE staff_state = 1";
        try {
            pool.query(sql, function (err, result) {
                callback(result);
            });
        } catch (error) {

        }
    },

    getStaffById: function (id, callback) {
        var sql = "SELECT * FROM staff WHERE staff_id = " + id;
        try {
            pool.query(sql, function (err, result) {
                callback(result);
            });
        } catch (error) {

        }
    },

    updateStaff: function (staff, callback) {
        var sql = "UPDATE staff SET staff_code = '" + staff.staff_code + "', staff_name = '" + staff.staff_name
            + "', staff_dob='" + staff.staff_dob + "', staff_phone='" + staff.staff_phone + "', staff_address = '"
            + staff.staff_address + "', staff_role = '" + staff.staff_role + "' WHERE staff_id = " + staff.staff_id;
        try {
            pool.query(sql, function (err, result) {
                callback(err, result);
            });
        } catch (error) {
            console.log(error);
        }
    },

    addStaff: function (staff, callback) {
        var sql = "INSERT INTO staff(staff_code, staff_name, staff_dob, staff_phone, staff_address, staff_role, username, password) "
            + "VALUES ('" + staff.staff_code + "','" + staff.staff_name + "','" + staff.staff_dob + "','" + staff.staff_phone + "','" + staff.staff_address + "','" + staff.staff_role + "','" + staff.username + "','" + staff.password + "')";
        try {
            console.log(sql);
            pool.query(sql, function (err, result) {
                callback(err, result);
            });
        } catch (error) {
            console.log(error);
        }
    },

    deleteStaff: function (id, callback) {
        var sql = "UPDATE  staff SET staff_state = 0 WHERE staff_id = " + id;
        try {
            pool.query(sql, function (err, result) {
                callback(err, result);
            });
        } catch (error) {

        }
    },

    getManager: function (username, callback) {
        var sql = "SELECT * FROM staff WHERE username = '" + username + "' AND staff_role = 'MANAGER'";
        try {
            pool.query(sql, function (err, result) {
                if (result != null && result.length > 0) {
                    callback(result[0]);
                } else {
                    callback(null);
                }

            });
        } catch (error) {

        }
    },

    getLoginStaff: function (username, callback) {
        var sql = "SELECT * FROM staff WHERE username = '" + username + "'";
        try {
            pool.query(sql, function (err, result) {
                if (result != null && result.length > 0) {
                    callback(result[0]);
                } else {
                    callback(null);
                }
            });
        } catch (error) {

        }
    },

    updateLocationOfStaff: function (staffId, x, y, callback) {
        var sql = "UPDATE staff SET x = " + x + ", y = " + y + " WHERE staff_id = " + staffId;
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

    resetLocationOfStaff: function (staffId, callback) {
        this.updateLocationOfStaff(staffId, -1, -1, function (result) {
            callback(result);
        });
    },

    getStaffNameById: function (id, callback) {
        var sql = "SELECT staff_name FROM staff WHERE staff_id = " + id;
        try {
            pool.query(sql, function (err, result) {
                if (!err && result.length != 0) {
                    var name = result[0].staff_name;
                    callback(name);
                } else {
                    callback(null);
                }
            });
        } catch (error) {
            callback(null);
        }
    }
}

// StaffDao.getAllStaff(function(result){
//     console.log(result.length);
// });

// StaffDao.getStaffNameById(1, function(rs){
//     console.log(rs);
// });

module.exports = StaffDao;