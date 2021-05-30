const anomaly = require('../Model/AnomalyTimeSteps');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

function createTable(anomalies) {
    const map = anomaly.getTimeSteps(anomalies);
    let table = document.createElement('table');
    let tr = table.insertRow(-1);

    const th1 = document.createElement("th"); // TABLE HEADER.
    th1.innerHTML = "Correlate Feature";
    tr.appendChild(th1);

    const th2 = document.createElement("th"); // TABLE HEADER.
    th2.innerHTML = "Row Number";
    tr.appendChild(th2);
    for (let i = 0; i < map.size; i++) {
        tr = table.insertRow(-1);
        var feature = Array.from(map.keys())[i];
        var val = map.get(feature);
        for(let j = 0; j < val.length; j++) {
            let tabCell1 = tr.insertCell(-1);
            let tabCell2 = tr.insertCell(-1);
            tabCell1.innerHTML = feature;
            tabCell2.innerHTML = val[j];
        }
    }
    return table.outerHTML;
}
module.exports = {createTable};
