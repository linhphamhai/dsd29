const express = require('express');
const router = express.Router();
const staffDao = require("../dao/StaffDao");

router.get("/api/staff/get-all", function(req, res){
    staffDao.getAllStaff(function(result){
        res.end(JSON.stringify(result));
    })
});

router.get("/api/staff", function(req, res){
    var id = req.query.id;
    staffDao.getStaffById(id, function(result){
        res.end(JSON.stringify(result));
    })
});

router.put("/api/staff/update", function(req, res){
    staffDao.updateStaff(req.body, function(err, result){
        if(err){
            res.status(501).json({state : 'NO'});
        }else{
            res.status(200).json({state : 'YES'});
        }
       
    })
});

router.post("/api/staff/create", function(req, res){
    staffDao.addStaff(req.body, function(err, result){
        if(err){
            res.status(501).json({state : 'NO'});
        }else{
            res.status(200).json({state : 'YES'});
        }
    });
});

router.delete("/api/staff", function(req, res){
    staffDao.deleteStaff(req.body.staff_id, function(err, result){
        if(err){
            res.status(501).json({state : 'NO'});
        }else{
            res.status(200).json({state : 'YES'});
        }
    });
});










module.exports = router;