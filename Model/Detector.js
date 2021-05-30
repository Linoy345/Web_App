const ts = require('./TimeSeries');
function algorithm_Setting(type) {
    ts.setAlgoSetting(type);
}
function learn(learnFile) {
    ts.createTimeSeries(learnFile)
    ts.learn();
}
function detect(detectFile) {
    return ts.detect(detectFile);
    //ts.getNormalModel();
}

function learnDetect(learnFile, detectFile, setting){
    learn(learnFile);
    algorithm_Setting(setting);
    return detect(detectFile);
}
module.exports = {learnDetect};
// module.exports = {algorithm_Setting, learn, detect};
