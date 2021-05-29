
// function printMap(map){
//     map.forEach((anomalies,key) => {
//         console.log(key + ':');
//         anomalies.forEach(anomal =>{
//             console.log(anomal);
//         })
//     })
// }

/*
    Add anomaly to given header in map.
*/
function addAnomaly(map, header, anomaly){
    if (!map.has(header)) {
        map.set(header, []);
    }
    map.get(header).push(anomaly);
}

/*
Create a string in the format of: "start"-"end".
 */
function timeStepString(start, end){
    let  result = start.toString();
    result += "-";
    result += end.toString();
    return result;
}

/*
From strings of anomalies- create a map in which- key is correlation, value is string of anomalies for this correlation.
*/
function anomaliesToMap(anomaliesString) {
    let anomalies = anomaliesString.split('\n');
    let result = new Map();
    anomalies.forEach(element => {
        let anomaly = element.split(',');
        addAnomaly(result, anomaly[0], anomaly[1]);
    });

    return result;
}

/*
Identify time steps sequence in anomalies, combine them into a new map.
 */
function mapToTimeSteps(anomaliesMap) {
    let timeSteps = new Map();
    anomaliesMap.forEach((anomalies, header) => {
        let start = parseInt(anomalies[0]);
        let end = start;
        anomalies.slice(1).forEach((anomaly, index, arr) => {
            anomaly = parseInt(anomaly);
            if(Object.is(arr.length - 1, index)){ // Check if it is the last iteration.
                if(anomaly > end + 1){
                    addAnomaly(timeSteps, header, timeStepString(start, end));
                    addAnomaly(timeSteps, header, timeStepString(anomaly, anomaly));
                } else {
                    addAnomaly(timeSteps, header, timeStepString(start, anomaly));
                }
            } else { //Not last iteration
                if(anomaly > end + 1) {
                    addAnomaly(timeSteps, header, timeStepString(start, end));
                    start = anomaly;
                }
                end = anomaly;
            }
        });
    });
    return timeSteps;
}

function getTimeSteps(anomaliesString){
    return mapToTimeSteps(anomaliesToMap(anomaliesString));
}

module.exports = {getTimeSteps};
