class TimeSeries {
	constructor(csv) {
		this.ts = []
		var temp = csv.split("\n")
		temp.forEach(element => this.ts.push(element.split(",")));
		console.log(temp)
		this.NumOfColumns = temp[0].length;
		this.NumOfRows = temp.length - 1;
		this.map = {}
		for (var i = 0; i < this.NumOfColumns; i++) {
			this.map[temp[0][i]] = i;
		}

		this.FindValue = function (name, row) {
			return this.ts[row + 1][map[name]];
		}

		this.FindValueByIndex = function (index, row) {
			return this.ts[row + 1][index]
		}

		this.GetColumnNames = function () {
			return this.ts[0];
		}

		this.GetColumnNameByIndex = function (index) {
			var x = [];
			for (var i = 1; i < this.NumOfRows + 1; i++) {
				x.push(this.ts[i][index])
			}
			return x;
		}

		this.GetColumnName = function (name) {
			return this.GetColumnNameByIndex(this.map[name])
		}

		this.GetRow = function (index) {
			return this.ts[index + 1];
		}
	}
}