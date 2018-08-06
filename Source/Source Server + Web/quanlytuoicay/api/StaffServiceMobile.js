var staffDao = require("../dao/StaffDao");
const treeStateDao = require("../dao/TreeStateDao");
var jwt = require('jsonwebtoken');
const Utils = require("./Utils");
const express = require('express');
const router = express.Router();


router.post('/api/staff/login', function (req, res) {
    var currentUser = req.body;
    console.log(currentUser);
    staffDao.getLoginStaff(currentUser.username, function (result) {
        if (result != null) {
            if (currentUser.password == result.password) {
                const token = jwt.sign({ result }, 'my_secret_key');
                res.json({ token, result });
            } else {
                res.json({ token: null, result: null });
            }
        } else {
            res.json({ token: null, result: null });
        }
    });
});

router.get('/api/protected', ensureToken, function (req, res) {
    jwt.verify(req.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json(
                {
                    text: ' this is protected;',
                    data: data
                }
            );
        }
    })

});




router.get("/api/tree-and-water", function(req, res){
    var x = req.query.x;
    var y = req.query.y;
    var max = req.query.max;
    Utils.getTreeAndWaterForStaff(x, y, max, function(finalResult){
        if(finalResult != null){
             res.status(200).json(finalResult);
        }else{
            res.status(404).json({result : null})
        }
    })

});

router.get("/api/nearest-water-station", function(req, res){
    Utils.getWaterStationNearStaff(req.query.x, req.query.y, function(result){
         res.json(result);
    })
})


function ensureToken(req, res, next) {
    const beareHeader = req.headers["authorization"];
    if (typeof beareHeader !== 'undefined') {
        const beare = beareHeader.split(' ');
        const beareToken = beare[1];
        req.token = beareToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;