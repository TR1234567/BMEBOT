const express = require('express')

var app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

var data = [];

var hex = require('./hexToSignedInt');
var DATAsensor = mongoose.model('Dsensor',{
    Sensor: {
        type: String,
        required:true,
         minlength: 1,
         trim: true
    },
    Value:{
        type: Number,
        required:true,
         minlength: 1,
         trim: true
    },
     Date:{
         type: String,
    }
    });

app.post('/', (req, res) => {

    data = req.body.DevEUI_uplink.payload_hex;

    var timestamp = req.body.DevEUI_uplink.Time;

    
    var jsonbaro = {
        Sensor:"barometer",
        Value:barometer,
        Date:timestamp
    };
    var jsontem = {
        Sensor:"Tempuratue",
        Value:tempurature,
        Date:timestamp
    };
    var jsonhumid = {
        Sensor:"humidity",
        Value:humidity,
        Date:timestamp
    };
    var jsonacelX ={
        Sensor:"acelerometerX",
        Value:acelerometerX,
        Date:timestamp
    };
    var jsonacelY ={
        Sensor:"acelerometerY",
        Value:acelerometerY,
        Date:timestamp
    };
    var jsonacelZ ={
        Sensor:"acelerometerZ",
        Value:acelerometerZ,
        Date:timestamp
    };
    var jsongyroX = {
        Sensor:"gyroscopeX",
        Value:gyroscopeX,
        Date:timestamp
    };
    var jsongyroY = {
        Sensor:"gyroscopeY",
        Value:gyroscopeY,
        Date:timestamp
    };
    var jsongyroZ = {
        Sensor:"gyroscopeZ",
        Value:gyroscopeZ,
        Date:timestamp
    };
    
    var jsonanalog = {
        Sensor:"analoginput",
        Value:analoginput,
        Date:timestamp
    };

    var barometer = Number('0'+'X'+data[4]+data[5]+data[6]+data[7])*0.1;

    var tempurature = hexToSignedInt(data[12]+data[13]+data[14]+data[15])*0.1;

    var humidity = Number('0'+'X'+data[20]+data[21])*0.5;

    var acelerometerX =  hexToSignedInt(data[26]+data[27]+data[28]+data[29])*0.001;
    var acelerometerY =  hexToSignedInt(data[30]+data[31]+data[32]+data[33])*0.001;
    var acelerometerZ =  hexToSignedInt(data[34]+data[35]+data[36]+data[37])*0.001;

    var gyroscopeX =  hexToSignedInt(data[42]+data[43]+data[44]+data[45])*0.001;
    var gyroscopeY =  hexToSignedInt(data[46]+data[47]+data[48]+data[49])*0.001;
    var gyroscopeZ =  hexToSignedInt(data[50]+data[51]+data[52]+data[53])*0.001;

    var analoginput = hexToSignedInt(data[58]+data[59]+data[60]+data[61])*0.01;

    var sensordata = [barometer,tempurature,humidity,acelerometerX,acelerometerY,acelerometerZ,gyroscopeX,gyroscopeY,gyroscopeZ,analoginput];
    
    console.log(sensordata[0] *0.1 + ' hectopascal');
    console.log(sensordata[1] *0.1 + ' celcius');
    console.log(sensordata[2] *0.5 + '%');
    console.log(hexToSignedInt(data[26]+data[27]+data[28]+data[29])*0.001 +' degree in X angle');
    console.log(hexToSignedInt(data[30]+data[31]+data[32]+data[33])*0.001 +' degree in Y angle');
    console.log(hexToSignedInt(data[34]+data[35]+data[36]+data[37])*0.001 +' degree in Z angle');
    console.log(hexToSignedInt(data[42]+data[43]+data[44]+data[45])*0.001+' degree per second');
    console.log(hexToSignedInt(data[46]+data[47]+data[48]+data[49])*0.001+' degree per second');
    console.log(hexToSignedInt(data[50]+data[51]+data[52]+data[53])*0.001+' degree per second');
    console.log(hexToSignedInt(data[58]+data[59]+data[60]+data[61])*0.01 +' degree');

    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DATA");
        var myobj = [
            jsonbaro,
            jsontem,
            jsonhumid,
            jsonacelX,
            jsonacelY,
            jsonacelZ,
            jsongyroX,
            jsongyroY,
            jsongyroZ,
            jsonanalog
        ]
        dbo.collection("SENSOR").insertMany(myobj, function(err, res) {
          if (err) throw err;
          console.log("Document inserted");
          db.close();
        });
        dbo.collection("SENSOR").find({}).toArray(function(err , result){  
            if(err) throw err;
            console.log(result);
            db.close();
          });
      });
});


app.listen(4000, () => {

  console.log('Start server at port 4000.')

});