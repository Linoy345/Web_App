//imports modules
const express = require('express')
const path = require('path')
const index = path.resolve('../View/index.html')
const view = path.resolve('../View')
const fileUpload = require('express-fileupload')
const detector = require('../Model/Detector')
const app = express()
//define app uses
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static(view));

// TODO: make app asynchronous.
app.use(fileUpload({}))
app.use(express.static('../View'))
//Get Method for '/' url
app.get('/', (req, res) => {
    res.sendFile("./index.html") // TODO: Change to Gitit view file.
})
//Post Method for '/search' url
app.post('/detect', (req, res) => {
    let settingBinery = Buffer.from(req., 'binary').toString('base64'); // todo: get algorithm setting
    let setting = Buffer.from(settingBinery, 'base64').toString();
    let LearnFileBinery = Buffer.from(req., 'binary').toString('base64'); //todo: get learnFile  setting
    let LearnFile = Buffer.from(LearnFileBinery, 'base64').toString();
    let DetectFileBinery = Buffer.from(req., 'binary').toString('base64'); //todo: get detectFile  setting
    let DetectFile = Buffer.from(DetectFileBinery, 'base64').toString();
    detector.algorithm_Setting(setting);
    detector.learn(LearnFile);
    res.write(JSON.stringify(detector.detect(DetectFile))); // Todo: convert string to binary.
    res.end();
})
//starting server on port 8080
app.listen(8080, ()=>console.log("server started at 8080"))