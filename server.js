var path = require('path')
var express = require('express')
var app = express()
var dir = path.join(__dirname, 'dist')
app.use('/paldi-dev', express.static(dir))
app.listen(3000, function () {
  console.log('Server listening on port 3000!')
})