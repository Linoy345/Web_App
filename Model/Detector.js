const ts = require('TimeSeries');
function algorithm_Setting(type) {
    ts.algorithm_setting = type;
}
function learn(learnFile) {
    ts.createTimeSeries(learnFile)
    ts.learn();
}
function detect(detectFile) {
    return ts.detect(detectFile);
}
function open(){
    
}
function close(){
    
}

module.exports = {algorithm_Setting, learn, detect, open, close};
