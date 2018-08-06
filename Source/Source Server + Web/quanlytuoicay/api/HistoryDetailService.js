const historyDao = require("../dao/HistoryDetailDao");
const express = require('express');
const router = express.Router();
var TreeDao = require("../dao/TreeDao")



router.get("/api/history-detail/get", function(req, res){
    historyDao.getAllHistoryInMonth(req.query.staff_id, function(result){
         res.json(result);
    });
});

router.get("/api/history-detail/get-for-tree", function(req, res){
    historyDao.getAllHistoryOfTree(req.query.tree_id, function(result){
         res.json(result);
    });
});

router.post("/api/history-detail/cancel", function(req, res){
   var tree_id = req.body.tree_id;
   TreeDao.unblockTree(tree_id);
    res.end(JSON.stringify({result: true}));
});




module.exports = router;