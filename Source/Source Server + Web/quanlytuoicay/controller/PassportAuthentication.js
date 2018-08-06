var Passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var pool = require("../config/db");
var staffDao = require('../dao/StaffDao');
Passport.use(new LocalStrategy(function(username, password, done){
    var sql = "SELECT * FROM staff WHERE username = '" + username + "' AND password ='" + password +  "'";
    pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        if(results.length > 0){
            var user = results[0];
            return done(null, user);
        }
        return done(null, false);
    });
}));

Passport.serializeUser(function(user, done){
    done(null, user);
});

Passport.deserializeUser(function(user, done){
    var sql = "SELECT * FROM staff WHERE staff_id = " + user.staff_id + ";";
    pool.query(sql, function (error, results, fields) {
        if(results.length > 0){
            var user = results[0];
            return done(null, user);
        }
        return done(null, false);
    });
});

module.exports = Passport;