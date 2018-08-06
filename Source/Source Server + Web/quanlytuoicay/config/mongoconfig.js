var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://root:admin@ds215759.mlab.com:15759/dsd";
var pool = require('./db');


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("dsd");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("customers").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});


function insertNewData(data){

}