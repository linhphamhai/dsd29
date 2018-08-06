const express = require('express');
var router = express.Router();
var Passport = require("./PassportAuthentication");

router.get('/login', function(req, res){
    res.render("login");
});

router.post("/login", Passport.authenticate('local', {failureRedirect : "/login", successRedirect : "/home"}));

router.get('/private', function(req, res){
    if(req.isAuthenticated()){
        res.render("private");
    }else{
         res.redirect('/login');
    }
});


module.exports = router;