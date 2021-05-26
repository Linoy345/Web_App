//imports modules
const express = require('express');
const fileUpload = require('express-fileupload');
const detector = require('../Model/Detector');
const path = require('path');
const index = path.resolve('../View/index.html');
const view = path.resolve('../View');

const app = express();

// function BytesToString(content){
//     let settingBinery = Buffer.from(content, 'binary').toString('base64');
//     return  Buffer.from(settingBinery, 'base64').toString();
// }

//define app uses
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload());
app.use(express.static('../View'));
//Get Method for '/' url
app.get('/', (req, res) => {
    res.sendFile("./index.html"); // TODO: Change to Gitit view file.
})
//Post Method for '/search' url
app.post('/detect', (req, res) => {
    if(req.files) {
        detector.learn(req.files.learn_file.data.toString());  // Todo: get algorithm setting
        detector.algorithm_Setting(req.body.setting.toString());    // Todo: get learnFile  setting
        let anomalies = detector.detect(req.files.detect_file.data.toString());
        res.write(JSON.stringify(anomalies));
        // res.write(JSON.stringify(detector.detect(req.files.detect_file.data.toString()))); // Todo: get detectFile  setting
    }
    res.end();
})
//starting server on port 8080
app.listen(8080, ()=>console.log("server started at 8080"))