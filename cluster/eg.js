var cluster = require('cluster');
var os = require('os');
var http=require('http')

if (cluster.isMaster){
  for (var i = 0, n = os.cpus().length; i < n; i += 1){
    cluster.fork();
  }
  console.log('cluster run ')
} else {
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
  console.log('server start')
}