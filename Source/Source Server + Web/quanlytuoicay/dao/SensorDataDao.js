const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://root:admin@ds215759.mlab.com:15759/dsd";
const sensorDao = require("./SensorDao");
var treeDao = require("./TreeDao");

var SensorDataDao = {
    addNewData: function (data, callback) {
        var sensorData = data;
        var sensor_id = data.sensor_id;
        try {
            sensorDao.getIdOfTreeBySensor(sensor_id, function (result) {
                sensorData.tree_id = result;
                treeDao.updateCurrentWaterFromSensor(data, result, function(rs){

                });
                sensorData.time = new Date().getTime();
                console.log(sensorData)
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("dsd");
                    dbo.collection("data").insertOne(sensorData, function (err, res) {
                        if (err) {
                            callback(false);
                        }
                        db.close();
                        callback(true);
                    });
                });
            });
        } catch (error) {
            callback(false)
        }
    },

    getDataOfTree: function (tree_id, callback) {
        console.log("Da goi den dao" + tree_id)
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("Da goi den dao loi")
                callback(null);
            } else {
                var myFind = { tree_id: tree_id };
                var mySort = { time: -1 };
                var dbo = db.db("dsd");
                dbo.collection("data").find(myFind).limit(72).sort(mySort).toArray(function (err, result) {
                    var humidities = [];
                    var temperatures = [];
                    var times = [];
                    for(var i = result.length -1; i >=0; i--){
                        var element = result[i];
                        var arr1 = [];
                        arr1.push(convertTimeToHour(element.time));
                        arr1.push(element.humidity);
                        var arr2 = [];
                        arr2.push(convertTimeToHour(element.time));
                        arr2.push(element.temperature);
                        humidities.push(arr1);
                        temperatures.push(arr2);
                    }
                    var finalResult = { humidities: humidities, temperatures: temperatures };
                    callback(finalResult);
                });
            }
        });
    }

}


function convertTimeToHour(time){
    var date = new Date(time).toUTCString() + "";
    var myDateString = date.substring(17, 22);
    return myDateString;
}


// var dt = new Date().getTime();
// for(var i = 0; i < 100; i ++){
//     dt = dt +  60 * 5 * 1000;
//     var myData = {
//         sensor_id : 4,
//         temperature : i % (i / 4 + 5) + 16,
//         humidity : i * 32423 % 100,
//         time : dt
//     }
//     SensorDataDao.addNewData(myData, function(s){

//     });
// }

// SensorDataDao.getDataOfTree(2, function (tr) {
//     console.log(tr)
// })

module.exports = SensorDataDao;