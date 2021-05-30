//imports modules
const express = require('express');
const fileUpload = require('express-fileupload');
const detector = require('../Model/Detector');
const table = require('../Controller/buildTable');

const app = express();

//define app uses
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload());
app.use(express.static('../View'));
//Get Method for '/' url
app.get('/', (req, res) => {
    res.sendFile("./index.html"); // TODO: Change to Roy view file.
})
//Post Method for '/search' url
app.post('/detect', (req, res) => {
    if (req.files) {
        detector.learn(req.files.learn_file.data.toString());
        detector.algorithm_Setting(req.body.setting.toString());
        let anomalies = detector.detect(req.files.detect_file.data.toString());
        res.write(table.createTable(anomalies).outerHTML);
    }
    res.end();
})
//starting server on port 8080
app.listen(8080, ()=>console.log("server started at 8080"))
