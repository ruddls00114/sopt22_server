const http = require('http')
const crypto = require('crypto')
const async = require('async')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let std = 'sopt'

  let taskArray = [

    (callback) => {
      crypto.randomBytes(32,(err,result) =>{
        if(err) 
          callback(err)
        else 
          callback(null,result.toString('base64'))
      })
    },
    (salt,callback) =>{
      crypto.pbkdf2(std, salt, 100000, 64, 'sha512', (err, hashed) => {
        if (err)
          callback(err)
        else
          callback(null, hashed.toString('base64'))
      })
    },
    (hashedpwd, callback) => {
      fs.writeFile('./training.txt', hashedpwd, 'utf8', (err,result) =>{
        if(err)
          callback(err)
        else
         callback(null,hashedpwd)
      })
    },
    (hashedpwd,callback) => {
      res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
      res.end(JSON.stringify({
        msg: "success",
        hashed: hashedpwd
      }))
      callback(null,'finish')
    }
  ]
async.waterfall(taskArray, (err, result) => {
  if(err)
   console.log(err)
  else
   console.log(result)
})

}).listen(3000, () => {
  console.log("Server running on port 3000!")
})
