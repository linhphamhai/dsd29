const treeTypeDao = require("../dao/TreeTypeDao");
const express = require('express');
const router = express.Router();


router.post("/api/tree-type/create", function (req, res) {
    var treeType = req.body;
    treeTypeDao.createTreeTpye(treeType, function (result) {
        if (result != null) {
            res.json({ state: 'YES' });
        } else {
            res.json({ state: 'NO' });
        }
    })
});

router.put("/api/tree-type/update", function (req, res) {
    var treeType = req.body;
    treeTypeDao.updateTreeType(treeType, function (result) {
        if (result != null) {
            res.json({ state: 'YES' });
        } else {
            res.json({ state: 'NO' });
        }
    })
});

router.delete("/api/tree-type/delete", function (req, res) {
    var tree_type_id = req.body.type_id;
    treeTypeDao.deleteTreeType(tree_type_id, function (result) {
        if (result != null) {
            res.json({ state: 'YES' });
        } else {
            res.json({ state: 'NO' });
        }
    })
});

router.get("/api/tree-type/get-all", function (req, res) {
    treeTypeDao.getAllTreeType(function (result) {
        if (result != null) {
            res.json(result);
        } else {
            res.json({ state: 'NO' });
        }
    })
});

router.get("/api/tree-type/get", function (req, res) {
    var type_id = req.query.type_id;
    treeTypeDao.getTreeTypeById(type_id, function (result) {
        if (result != null) {
            res.json(result);
        } else {
            res.json({ state: 'NO' });
        }
    })
});




module.exports = router;