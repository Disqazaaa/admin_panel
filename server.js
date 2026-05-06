var http = require('http')
var fs = require('fs')
var path = require('path')

var port = process.env.PORT || 3000
var host = '127.0.0.1'
var root = __dirname

function type(file){
  if(file.endsWith('.html')) return 'text/html'
  if(file.endsWith('.css')) return 'text/css'
  if(file.endsWith('.js')) return 'text/javascript'
  if(file.endsWith('.json')) return 'application/json'
  return 'text/plain'
}

var srv = http.createServer(function(req,res){
  var url = req.url.split('?')[0]
  if(url == '/') url = '/index.html'
  var f = path.join(root,url)
  fs.readFile(f,function(err,data){
    if(err){
      fs.readFile(path.join(root,'index.html'),function(err2,data2){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(data2)
      })
      return
    }
    res.writeHead(200,{'Content-Type':type(f)})
    res.end(data)
  })
})

srv.listen(port,host,function(){
  console.log('http://localhost:'+port)
})
