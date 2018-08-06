const express = require('express');
var router = express.Router();

var staffDao = require("../dao/StaffDao");
var historyDao = require("../dao/HistoryDetailDao")

//Danh sách nhân viên
router.get('/staffs/:page', function(req, res, next) {
    staffDao.getAllStaff(function(result){
        allStaffs = JSON.parse(JSON.stringify(result));//tất cả nhân viên
        count = allStaffs.length;//Số nhân viên
        var perPage = 2;//Số nhân viên mỗi page
        var page = req.params.page || 1;//Current page
        var pages = 0;//Tổng số page

        if(count > perPage){
            pages = Math.ceil(count / perPage);

        }
        
        staffs = allStaffs.slice((perPage * page) - perPage, (perPage * page));//Danh sách nhân viên ứn với page
       
        res.render('staffs', { staffs: staffs,
                               current: page,
                               pages: pages,
                               title: "Danh sách nhân viên"
                            }
                    )
    });
    
});

router.get("/staff/:staffId", function(req, res){
    var staff_id = req.params.staffId;
    staffDao.getStaffById(staff_id, function(staff){
        historyDao.getAllHistoryInMonth(staff_id, function(history){
            var data = {staff : staff[0], histories : history, title:"Nhân viên - "+staff[0].staff_name}
            console.log(data)
            res.render("staff", data);
        });
    })
});

module.exports = router;