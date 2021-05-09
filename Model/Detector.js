const cpp = 5 //// TODO : make this connection to cpp api.
    function algorithm_Setting(type) {
        cpp.algorithm_Setting(type);
    }
    function learn(learnFile) {
        cpp.learnNormal(learnFile);
    }
    function detect(detectFile){
        return cpp.detect(detectFile);
    }
    function open(){
        cpp.openConnection();
    }
    function close(){
        cpp.closeConnection();
    }
module.exports = {algorithm_Setting, learn, detect, open, close};
