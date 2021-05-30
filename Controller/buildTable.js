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
    tr.setAttribute("style", " width:100%;margin: 25px auto;box-shadow: 0px 0px 20px rgba(0,0,0,0.10), 0px 10px 20px rgba(0,0,0,0.05), 0px 20px 20px rgba(0,0,0,0.05), 0px 30px 20px rgba(0,0,0,0.05); border: 2px solid black;border-collapse: collapse; padding: 5px;text-align: center;")

    const th1 = document.createElement("th"); // TABLE HEADER.
    th1.innerHTML = "Correlate Feature";
    th1.setAttribute("style", "background-color: #008CBA; color: white")
    tr.appendChild(th1);

    const th2 = document.createElement("th"); // TABLE HEADER.
    th2.innerHTML = "Row Number";
    th2.setAttribute("style", "background-color: #008CBA; color: white")
    tr.appendChild(th2);
    for (let i = 0; i < map.size; i++) {
        tr = table.insertRow(-1);
        var feature = Array.from(map.keys())[i];
        var val = map.get(feature);
        for(let j = 0; j < val.length; j++) {
            let tabCell1 = tr.insertCell(-1);
            let tabCell2 = tr.insertCell(-1);
            tabCell1.setAttribute("style", "background-color: #D5F2FB;")
            tabCell2.setAttribute("style", "background-color: #D5F2FB;")
            tabCell1.innerHTML = feature;
            tabCell2.innerHTML = val[j];
        }
    }
    return table.outerHTML;
}
module.exports = {createTable};
