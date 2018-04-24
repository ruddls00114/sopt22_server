const http = require('http')
const crypto = require('crypto-promise');
const async = require('async')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let std = 'sopt'
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, result) => {
      if (err)
        reject(err)
      else
        resolve(result.toString('base64'))
    })
  })
    .catch(err => {
      console.log(err)
    })
    .then(salt => {
      return new Promise((resolve, reject) => {
        crypto.pbkdf2(std, salt, 100000, 64, 'sha512', (err, hashed) => {
          if (err)
            reject(err)
          else
            resolve(hashed.toString('base64'))
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
    .then(hashedpwd => {
      return new Promise((resolve, reject) => {
        fs.writeFile('./training.txt', hashedpwd, 'utf8', (err, result) => {
          if (err)
            reject(err)
          else
          console.log("succeccful saving")
            resolve(hashedpwd)
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
    .then(hashedpwd => {

      res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
      res.end(JSON.stringify({
        msg: "success",
        hashed: hashedpwd
      }))
      console.log("finish")
    })

}).listen(3000, () => {
  console.log("Server running on port 3000!")
})
