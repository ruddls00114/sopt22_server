//http://13.125.118.111:3000/homework/2nd
const http = require('http')
const request = require('request')//외부모듈
const fs = require('fs')
const json2csv = require('json2csv')
const Converter = require('csvtojson').Converter

const server = http.createServer(function (req, res) {

	let option = {
		uri: 'http://13.125.118.111:3000/homework/2nd',
		method: 'GET'
	}

	request(option, (err, response, body) => {
		var bodyParsed = JSON.parse(body)

		let field = ['time']
		let value = bodyParsed

		let object = json2csv.parse(value, { field }) //제이슨객체를 스트링으로 바꿔줌 

		fs.writeFile('./time.csv', object, function (err) {
			if (err) {
				console.log("write csv error : " + err)
			} else {
				console.log("successful write csv")
			}
		})
	})

	let converter = new Converter({})
	let data = []
	converter.fromFile('./time.csv', function (err, result) {
		if (err) {
			console.log("read csv file error : " + err)
		} else {
			console.log("successful read csv file")
			data = result
			res.writeHead(200, { 'Content-Type': 'application/jsoncharset=utf-8' })
			res.end(JSON.stringify({
				msg: "success",
				data: data
			}))
		}
	})
}).listen(3000, function () {
	console.log("3000번 포트로 구동중!")
})
