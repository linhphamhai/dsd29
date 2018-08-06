const express = require('express');
var router = express.Router();
var TreeTypeDao = require("../dao/TreeTypeDao");

router.get("/tree-type", function(req, res){
    TreeTypeDao.getAllTreeType(function(tree_types){
        var data = {tree_types : tree_types,
                    title: "Danh sách các loại cây"
                   }
        console.log(data)
         res.render("tree-types", data);
    });
})

module.exports = router;