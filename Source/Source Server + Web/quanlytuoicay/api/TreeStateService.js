const express = require('express');
const router = express.Router();
const TreeStateDao = require("../dao/TreeStateDao");


router.get("/get-tree-state-by-confirm", function(req, res){
    var confirmed = req.query.confirmed;
    TreeStateDao.getNotification(confirmed, function(result){
        res.end(JSON.stringify(result));
    })
});

router.get("/confirm-tree-state", function(req, res){
    var id = req.query.id;
    TreeStateDao.confirmNotification(id, function(result){
        res.redirect("/notification")
    })
});

router.get("/get-size-notification", function(req, res){
    TreeStateDao.getNotification(0, function(result){
        res.end(JSON.stringify(result.length));
    })
})

module.exports =router;