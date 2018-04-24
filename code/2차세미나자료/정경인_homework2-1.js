const url = require('url');
const querystring = require('querystring');
const crypto = require('crypto');
const http = require('http');

let urlPath = 'localhost:3000?str=seminar';
let urlParsed = url.parse(urlPath);
let queryParsed = querystring.parse(urlParsed.query);
let str = queryParsed.str;

http.createServer(function (req, res) {
  crypto.randomBytes(32, function (err, buffer) {
    if (err) {
      console.log(err);
    } else {
      crypto.pbkdf2(str, buffer.toString('base64'), 100000, 64, 'sha512', function (err, hashed) {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end(JSON.stringify({
            msg: 'fail'
          }));
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end(JSON.stringify({ 
            msg: 'success',
            hashed: hashed.toString('base64')
          }));
        }
      })
    }
  })
}).listen(3000, function () {
  console.log("3000포트에 연결!");
})