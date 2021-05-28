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

module.exports = {algorithm_Setting, learn, detect};
