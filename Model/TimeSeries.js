const enclosingCircle = require('smallest-enclosing-circle');
class TimeSeries {
	constructor(csv) {
		var bla = [];
		var holder = [];
		this.ts = []
		//csv = csv.replaceAll('\r', '');
		var temp = csv.split("\r\n")
		temp.pop();
		temp.forEach(element => bla.push(element.split(",")));
		this.ts.push(bla[0]);
		bla.shift();
		bla.forEach(element => { element.forEach(eelement => holder.push(+(eelement))); this.ts.push(holder); holder = []; });
		this.NumOfColumns = function () { return this.ts[0].length; };
		this.NumOfRows = function () { return this.ts.length - 1; };
		this.map = {}
		for (var i = 0; i < this.NumOfColumns(); i++) {
			this.map[this.ts[0][i]] = i;
		}

		this.FindValue = function (name, row) {
			return this.ts[row + 1][this.map[name]];
		}

		this.FindValueByIndex = function (index, row) {
			return this.ts[row + 1][index]
		}

		this.GetColumnNames = function () {
			return this.ts[0];
		}

		this.GetColumnByIndex = function (index) {
			var x = [];
			for (var i = 1; i < this.NumOfRows() + 1; i++) {
				x.push(this.ts[i][index])
			}
			return x;
		}

		this.GetColumn = function (name) {
			return this.GetColumnByIndex(this.map[name])
		}

		this.GetRow = function (index) {
			return this.ts[index + 1];
		}
	}
}

class correlatedFeatures {
	constructor(feat1, feat2, correlation, lin_reg, threshold, center) {
		this.feat1 = feat1;
		this.feat2 = feat2;
		this.correlation = correlation;
		this.lin_reg = lin_reg;
		this.threshold = threshold;
		this.center = center;
	}
}

class Line {
	constructor(a, b) {
		this.a = a;
		this.b = b;
		this.f = function (x) {
			return a * x + b;
		}
	}
}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.setCords = function (x, y) {
			this.x = x;
			this.y = y;
		}
	}
}

class AnomalyReport {
	constructor(description, timeStep, val1, val2) {
		this.description = description;
		this.timeStep = timeStep;
		this.val1 = val1;
		this.val2 = val2;
		this.to_string = function () {
			var s = description;
			s += ",";
			s += timeStep;
			return s;
		};
	} 
}
var cf = [];
var ts;
var chosenAlgorithm;
createTimeSeries = function (file) {
	if (ts != undefined) {
		delete ts
    }
	ts = new TimeSeries(file)
}

algorithm_setting = function (type) {
	chosenAlgorithm = type;
}

function AVG(c) {
	var avg = 0;
	for (var i = 0; i < c.length; i++) {
		avg += c[i];
	}
	avg /= c.length;
	return avg;
}

function VAR(c) {
	const avg = AVG(c);
	//console.log(avg);
	var variance = 0;
	for (var i = 0; i < c.length; i++) {
		variance += (c[i] - avg) * (c[i] - avg);
	}
	variance /= c.length;
	return variance
}

function COAVG(c1, c2) {
	var coavg = 0;
	for (var i = 0; i < c1.length; i++) {
		coavg += c1[i] * c2[i];
	}
	return coavg / c1.length;
}

function COV(c1, c2) {
	const cov = COAVG(c1, c2) - AVG(c1) * AVG(c2)
	return cov;
}

function Pearson(c1, c2) {
	const p = COV(c1, c2) / (Math.sqrt(VAR(c1)) * Math.sqrt(VAR(c2)));
	return p;
}

function LinReg(c1, c2) {
	const a = COV(c1, c2) / VAR(c1);
	const b = AVG(c2) - a * AVG(c1);
	return new Line(a, b);
}

function getMaxDev(c1, c2, linreg) {
	var maxDev = 0;
	for (var i = 0; i < c1.length; i++) {
		var currDev = dev(new Point(c1[i], c2[i]), linreg)
		if (currDev > maxDev) {
			maxDev = currDev;
		}
	}
	return maxDev;
}

function dev(p, l) {
	x = p.y - l.f(p.x);
	return Math.abs(x);
}

function addCorrelation(ts, col_i1, col_i2, max) {
	if (chosenAlgorithm == "Simple") {
		if (max > 0.9) {
			const f1 = ts.GetColumnNames()[col_i1];
			const f2 = ts.GetColumnNames()[col_i2];
			const correlation = max;
			const c1 = ts.GetColumnByIndex(col_i1);
			const c2 = ts.GetColumnByIndex(col_i2);

			const lin_reg = LinReg(c1, c2);
			const thresh = getMaxDev(c1, c2, lin_reg);
			var corFeat = new correlatedFeatures(f1, f2, correlation, lin_reg, thresh, new Point(0,0));
			cf.push(corFeat);
		}
	}
	else if (chosenAlgorithm == "Circle") {
		if (max > 0.5) {
			const f1 = ts.GetColumnNames()[col_i1];
			const f2 = ts.GetColumnNames()[col_i2];
			const correlation = max;
			var array = []
			const c1 = ts.GetColumnByIndex(col_i1);
			const c2 = ts.GetColumnByIndex(col_i2);
			for (var i = 0; i < ts.NumOfRows(); i++) {
				var point = new Point(c1[i], c2[i]);
				array.push(point);
			}
			var mincircle = enclosingCircle(array);
			const thresh = mincircle.r;
			const center = new Point(mincircle.x, mincircle.y);
			var corFeat = new correlatedFeatures(f1, f2, correlation, new Line(0,0), thresh, center);
			cf.push(corFeat);
        }
    }
}

function isAnomaly(ts, cf, timeStep) {
	if (chosenAlgorithm == "Simple") {
		var Column1 = ts.GetColumn(cf.feat1);
		var Column2 = ts.GetColumn(cf.feat2);
		currPoint = new Point(Column1[timeStep], Column2[timeStep]);
		currDev = dev(currPoint, cf.lin_reg);
		return (currDev > cf.threshold * 1.1);
	}
	else if (chosenAlgorithm == "Circle") {
		const cfX = cf.center.x;
		const cfY = cf.center.y;
		const c1 = ts.GetColumn(cf.feat1)[timeStep];
		const c2 = ts.GetColumn(cf.feat2)[timeStep];
		const dist = Math.sqrt(Math.pow(cfX - c1, 2) + Math.pow(cfY - c2, 2))
		return (dist > cf.threshold * 1.1)
	}
	else {
		console.log(chosenAlgorithm)
    }
}

learn = function () {
	
	cf = []
	console.log("learn:");
	for (var i = 0; i < ts.NumOfColumns() - 1; i++) {
		var Col1 = ts.GetColumnByIndex(i);
		var max = 0;
		var maxIndex = -1;
		for (var j = i + 1; j < ts.NumOfColumns(); j++) {
			var Col2 = ts.GetColumnByIndex(j);
			var correlativity = Math.abs(Pearson(Col1, Col2));
			if (correlativity > max) {
				max = correlativity;
				maxIndex = j;
			}
		}
		if (maxIndex >= 0) {
			addCorrelation(ts, i, maxIndex, max)
		}
	}
}

getNormalModel = function () {
	return cf;
}

detect = function (file) {
	console.log("detect");
	ts = new TimeSeries(file);
	var anomalies = [];
	const numOfRows = ts.NumOfRows();
	const cflen = cf.length;
	for (var cfIndex = 0; cfIndex < cflen; cfIndex++) {
		for (var timeStep = 0; timeStep < numOfRows; timeStep++) {
			if (isAnomaly(ts, cf[cfIndex], timeStep)) {
				var report = new AnomalyReport(cf[cfIndex].feat1 + "-" + cf[cfIndex].feat2, timeStep, ts.GetColumn(cf[cfIndex].feat1)[timeStep], ts.GetColumn(cf[cfIndex].feat2)[timeStep]);
				anomalies.push(report);
			}
		}
	}
	var anomaliesCSVString = "";
	for (var i = 0; i < anomalies.length; i++) {
		anomaliesCSVString += anomalies[i].to_string();
		anomaliesCSVString += "\n";
	}
	var str = anomaliesCSVString.substring(0, anomaliesCSVString.length - 1);
	return str;
}

function setAlgoSetting(type) {
	algorithm_setting(type);
}

module.exports = {getNormalModel, setAlgoSetting, algorithm_setting, createTimeSeries, learn, detect };