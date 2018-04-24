const http = require('http')
const request = require('request')//외부모듈
const fs = require('fs')
const json2csv = require('json2csv')
const Converter = require('csvtojson').Converter

const server = http.createServer(function (req, res) {

let option = {
  uri : 'http://13.125.118.111:3000/homework/2nd',
  method : 'POST',
  form : {
    name : '정경인',
    phone : '010-4165-1280'
  }
}
request(option,(err,response,body) =>{ // body: string형 --> parse해줘야함 !! 
  let bodyParsed = JSON.parse(body);
  // console.log(bodyParsed);


  let field = ['NAME','EMAIL','COLLEGE','MAJOR','PHONE']
  let value =bodyParsed.data
  let object=json2csv.parse(value,{field})
  fs.writeFile('./info.csv',object,(err,result) =>{
    if(err) console.log(err)
    else{
      console.log("info.csv에 저장완료")

			res.writeHead(200, {'Content-Type': 'text/plaincharset=utf-8'})
			res.end('success')
    }
  })
  
})//request
}).listen(3000,() =>{
  console.log("3000번 포트 구동중")
})