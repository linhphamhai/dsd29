const express = require('express');
const router = express.Router();
const treeDao = require("../dao/TreeDao");

router.get("/api/tree/get-all", function (req, res) {
    treeDao.getAllTree(function (result) {
        if (result == null) {
            res.status(404).json({ result: null });
        } else {
            res.status(200).json(result);
        }
    });
});

router.get("/api/tree/get-by-type", function (req, res) {
    var type_id = req.query.type_id;
    treeDao.getAllTreeByType(type_id, function (result) {
        if (result == null) {
            res.status(404).json({ result: null });
        } else {
            res.status(200).json(result);
        }
    });
});

router.get("/api/tree/get", function (req, res) {
    var id = req.query.tree_id;
    treeDao.getTreeById(id, function (result) {
        if (result == null) {
            res.status(404).json({ result: null });
        } else {
            res.status(200).json(result);
        }
    });
});

router.post("/api/tree/create", function (req, res) {
    var newTree = req.body;
    treeDao.createTree(newTree, function (result) {
        if (result == null) {
            res.status(404).json({ result: null });
        } else {
            res.status(200).json(result);
        }
    });
});

router.put("/api/tree/update", function (req, res) {
    var newTree = req.body;
    // console.log(newTree);
    treeDao.updateTree(newTree, function (result) {
        if (result == null) {
            res.status(404).json({ result: null });
        } else {
            res.status(200).json(result);
        }
    });
});

router.delete("/api/tree/delete", function (req, res) {
    var newTree = req.body;
    treeDao.deleteTree(newTree.tree_id, function (result) {
        if (result == null) {
            res.status(404).json({ result: null });
        } else {
            res.status(200).json(result);
        }
    });
});



module.exports = router;