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