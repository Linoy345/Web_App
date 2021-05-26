const ts = require('./TimeSeries');
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

module.exports = {algorithm_Setting, learn, detect};
