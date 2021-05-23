var fs = require('fs');
var csv = require('csv');
const parser = require("csv-parse");
class TimeSeries {
	constructor(csvFilePath) {
		this.ts = []
		this.NumOfColumns = 0;
		var readStream = fs.createReadStream(csvFilePath);
		const output = []
		// Create the parser
		const parser = parse({
			delimiter: ','
		})
		parse({}).
		// Use the readable stream api
		parser.on('readable', function () {
			let record
			record = parser.read()
			this.NumOfColumns = record.length;
			for (i = 0; i < this.NumOfColumns; i++) {
				this.ts.push(record[i])
			}
			while (record = parser.read()) {
				for (i = 0; i < this.NumOfColumns; i++) {
					this.ts[i] = record[i];
				}
			}
		})
		// Catch any error
		parser.on('error', function (err) {
			console.error(err.message)
		})
		parser.end()
	}
}