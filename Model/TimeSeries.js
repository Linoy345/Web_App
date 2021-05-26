const enclosingCircle = require('smallest-enclosing-circle');
class TimeSeries {
	constructor(csv) {
		this.ts = []
		var temp = csv.split("\n")
		temp.forEach(element => this.ts.push(element.split(",")));
		this.NumOfColumns = this.ts[0].length;
		this.NumOfRows = temp.length - 1;
		this.map = {}
		for (var i = 0; i < this.NumOfColumns; i++) {
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
			for (var i = 1; i < this.NumOfRows + 1; i++) {
				x.push(this.ts[i][index])
			}
			return x;
		}

		this.GetColumn = function (name) {
			console.log(this.map)
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
	ts = new TimeSeries(file)
}

algorithm_setting = function (type) {
	chosenAlgorithm = type;
}

function AVG(c) {
	return c.reduce((a, b) => (a + b)) / c.length;
}

function VAR(c) {
	const avg = AVG(c);
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
	if (algorithm_setting == "Simple") {
		if (max > 0.9) {
			const f1 = ts.GetColumnNames[col_i1];
			const f2 = ts.GetColumnNames[col_i2];
			const correlation = max;
			const c1 = ts.GetColumnByIndex[col_i1];
			const c2 = ts.GetColumnByIndex[col_i2];
			const lin_reg = LinReg(c1, c2);
			const thresh = getMaxDev(c1, c2, lin_reg);
			var corFeat = new correlatedFeatures(f1, f2, correlation, lin_reg, thresh, center);
			cf.push(corFeat);
		}
	}
	else if (algorithm_setting == "Circle") {
		if (max > 0.5) {
			const f1 = ts.GetColumnNames[col_i1];
			const f2 = ts.GetColumnNames[col_i2];
			const correlation = max;
			const c1 = ts.GetColumnByIndex[col_i1];
			const c2 = ts.GetColumnByIndex[col_i2];
			for (var i = 0; i < feat1.length; i++) {
				var point = {
					x: c1[i],
					y: c2(feat2)[i]
				}
				array.push(point);
			}
			var mincircle = enclosingCircle(array);
			const thresh = mincircle.r;
			const center = new Point(mincircle.x, mincircle.y);
			var corFeat = new correlatedFeatures(f1, f2, correlation, lin_reg, thresh, center);
			cf.push(corFeat);
        }
    }
}

function isAnomaly(ts, cf, timeStep) {
	if (chosenAlgorithm == "Simple") {
		var Column1 = ts.GetColumn(cf.feature1);
		var Column2 = ts.GetColumn(cf.feature2);
		currPoint = new Point(Column1[timeStep], Column2[timeStep]);
		currDev = dev(currPoint, cf.lin_reg);
		return (currDev > cf.threshold * 1.1);
	}
	else if (chosenAlgorithm == "Circle") {
		const cfX = cf.center.x;
		const cfY = cf.center.y;
		const c1 = ts.GetColumn(cf.feat1)[i];
		const c2 = ts.GetColumn(cf.feat2)[i];
		const dist = Math.sqrt(Math.pow(cfX - c1, 2) + Math.pow(cfY - c2, 2))
		return (dist > cf.threshold * 1.1)
	}
}

learn = function () {
	cf = []
	for (var i = 0; i < ts.NumOfColumns - 1; i++) {
		var Col1 = ts.GetColumnByIndex(i);
		var max = 0;
		var maxIndex = -1;
		for (var j = i + 1; j < ts.NumOfColumns; j++) {
			var Col2 = ts.GetColumnByIndex(j);
			const correlativity = Math.abs(Pearson(Col1, Col2));
			if (correlativity > max) {
				max = correlativity;
				maxIndex = j;
			}
		}
		if (maxIndex >= 0) {
			addCorrelation(ts, i, j, max)
		}
	}
}

getNormalModel = function () {
	return cf;
}

detect = function (file) {
	ts = new TimeSeries(file);
	var anomalies = [];
	const numOfRows = ts.NumOfRows;
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
module.exports = { algorithm_setting, createTimeSeries, learn, detect };