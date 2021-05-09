//imports modules
const express = require('express')
const fileUpload = require('express-fileupload')
const detector = require('../Model/Detector')
const app = express()
//define app uses
app.use(express.urlencoded({
    extended: false
}))

// TODO: make app asynchronous.
app.use(fileUpload({}))
app.use(express.static('View'))
//Get Method for '/' url
app.get('/', (req, res) => {
    res.sendFile('index.html') // TODO: Change to Gitit view file.
})
//Post Method for '/search' url
app.post('/detect', (req, res) => {
    res.write('searching for ' + req.body.key + +':\n')
    let learnFile = req.body.learnFile;
    let detectFile = req.body.detectFile;
    let setting = req.body.setting;
    detector.open();
    detector.algorithm_Setting(setting);
    detector.learn(learnFile);
    res.write(JSON.stringify(detector.detect(detectFile)));
    res.end()
})
//starting server on port 8080
app.listen(8080, ()=>console.log("server started at 8080"))