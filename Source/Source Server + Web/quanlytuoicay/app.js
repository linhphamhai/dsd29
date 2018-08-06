const express = require('express');
const app = express();
const server = require('http').Server(app);
var io = require('socket.io')(server);
const bodyPaser = require('body-parser');
const treeStateDao = require("./dao/TreeStateDao");
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
var Passport = require("./controller/PassportAuthentication");
var staffDao = require("./dao/StaffDao");
var multer = require("multer");
var LocationDao = require("./dao/LocationDao");
var TreeDao = require("./dao/TreeDao");
var HistoryDetailDao = require("./dao/HistoryDetailDao");
var jwt = require('jsonwebtoken');
const upload = require("express-fileupload");
const SensorDataDao = require("./dao/SensorDataDao")
var TreeLockDao = require("./dao/TreeLockDao");
app.use(upload());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('views', './views');


app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());
app.use(session({ secret: "hello" }));
app.use(Passport.initialize());
app.use(Passport.session());

// Home Controller
var homeController = require('./controller/HomeController');
app.use("/", homeController);


//Login Controller
var loginController = require('./controller/LoginController');
app.use("/", loginController);





// Staff Service
var staffService = require('./api/StaffService');
app.use("/", staffService);

// Staff Service
var MapSerivce = require('./api/MapService');
app.use("/", MapSerivce);


// Staff Service Mobile
var staffServiceMobile = require('./api/StaffServiceMobile');
app.use("/", staffServiceMobile);

// Water station service
var waterStationService = require('./api/WaterStationService');
app.use("/", waterStationService);

// Tree Service
var treeService = require('./api/TreeService');
app.use("/", treeService);

// Tree Service
var treeStateService = require('./api/TreeStateService');
app.use("/", treeStateService);

// Sensor Service
var sensorService = require('./api/SensorService');
app.use("/", sensorService);

// Sensor Service
var TreeTypeService = require('./api/TreeTypeService');
app.use("/", TreeTypeService);

// Sensor Data Service
var SensorDataService = require('./api/SensorDataService');
app.use("/", SensorDataService);

// HistoryDetail  Service
var HistoryDetailService = require('./api/HistoryDetailService');
app.use("/", HistoryDetailService);

// TreeTypeController  
var TreeTypeController = require('./controller/TreeTypeController');
app.use("/", TreeTypeController);

// SensorController  
var SensorController = require('./controller/SensorController');
app.use("/", SensorController);

var StaffController = require("./controller/StaffController");
app.use("/", StaffController);


server.listen(3000, function () {
    console.log("Server started in port 3000...");
});



//Socket IO

io.on("connection", function (socket) {
    // console.log("Connected ! The socket ID is :" + socket.id);

    LocationDao.addNewLocation(socket.id, function (result) {

    });
    sendLocationChange(io);

    socket.on("walk", function (data2) {
        var data = JSON.parse(data2);
        // khi test trên web thì comment dòng trên và sửa tham số hàm callback -> data
        var staff_id = data.staff_id;
        var x = data.x;
        var y = data.y;
        staffDao.getStaffNameById(staff_id, function (name) {
            LocationDao.updateLocation(socket.id, staff_id, name, x, y, function (result) {
                sendLocationChange(io);
            });
        })
    });

    socket.on('event', function (data) {
        console.log(data);
    });

    socket.on('disconnect', function () {
        LocationDao.deleteLocation(socket.id, function (result) {
            sendLocationChange(io);
        })
    })
});

function sendDataChange(theIO) {
    io.sockets.emit("sensor-data-sent", {});
}

function sendLocationChange(theIO) {
    LocationDao.getAllLocation(function (result) {
        // console.log(result);
        io.sockets.emit("location-change", result);
    });
}

function sendUpdatedTree(tree_id, theIO) {
    TreeDao.getTreeById(tree_id, function (tree) {
        io.sockets.emit("tree-change", tree);
    });
}

function sendNotification(theIO) {
    treeStateDao.getNotification(1, function (result) {
        io.sockets.emit("notification", result);
    })
}


const AppRouter = express.Router();
AppRouter.post("/api/sensor-data", function (req, res) {
    var data2 = req.body;
    var temperature = parseFloat(data2.temperature);
    var humidity = parseFloat(data2.humidity);

    if (Number.isNaN(temperature)) {
        temperature = Math.random() * 3 + 24;
    }

    if (Number.isNaN(humidity)) {
        humidity = Math.random() * 10 + 60;
    }



    var sensor_id = parseInt(data2.sensor_id);
    var data = { temperature, sensor_id, humidity };
    console.log(data);
    SensorDataDao.addNewData(data, function (result) {
        sendDataChange(io);
        res.json(result);
    })


});



// Update luong nuoc
AppRouter.post("/api/history-detail/create", function (req, res) {
    var historyDetail = req.body;
    HistoryDetailDao.addNewWorkHistory(historyDetail, function (result) {
        if (null != result) {
            sendUpdatedTree(historyDetail.tree_id, io);
        }
        res.json(result);
    });
});

AppRouter.get("/api/online-user/get-all", function (req, res) {
    LocationDao.getAllLocation(function (result) {
        res.end(JSON.stringify(result));
    });
});

var interval = setInterval(TreeLockDao.unLock, 60 * 15 * 1000);

app.use("/", AppRouter);



//Upload file Multer


// var storage = multer.diskStorage({
//     destination : function(req, file, callback){
//         callback(null , './public/images/uploads');
//     },

//     filename : function(req, file, callback){
//         callback(null, file.originalname);
//     }
// });

// var upload2 = multer({storage : storage});

// app.post("/api/demo-upload", upload2.single("tree_state_image"), function(req, res){
//     console.log("UPLOAD   ----" );
//     console.log(req.file );
//     console.log(req.body.tree_id);
//     res.end("success");
// });

app.post("/api/mobile/update-tree-state", function (req, res) {
    var index;
    var tree_state = req.body;
    var image_name;
    if (req.files.uploaded_file) {
        var file = req.files.uploaded_file;
        var name = file.name;
        for (index = name.length - 1; index > 0; index--) {
            if (name[index] == '.') {
                break;
            }
        }
        hauTo = name.substring(index, name.length);
        image_name = Date.now() + hauTo;
        file.mv("./public/images/uploads/" + image_name, function (err) {
            if (err) {
                console.log(err);
            } else {
            }
        });
        tree_state.tree_state_image = "/images/uploads/" + image_name;
    }
    console.log(tree_state);
    treeStateDao.updateStateOfTree(tree_state, function (result) {
        if (result != null) {
            res.status(200).end(JSON.stringify({ result: "YES" }));
        } else {
            res.status(501).end(JSON.stringify({ result: "NO" }));
        }
    });
    sendNotification(io);
});