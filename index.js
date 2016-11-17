var http = require('http');
var spawn = require('child_process').spawn;
var createHandler = require('github-webhook-handler');

// 下面填写的myscrect跟github webhooks配置一样，下一步会说；path是我们访问的路径
//path 为访问路径，secret 为 github webhooks 配置一样
var handler = createHandler({ path: '/auto_build', secret: '' });

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(7600);
handler.on('error', function (err) {
  console.error('Error:', err.message)
});
// 监听到push事件的时候执行自动化脚本
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  runCommand('sh', ['./auto_build.sh'], function( txt ){
    console.log(txt);
  });
});
function rumCommand( cmd, args, callback ){
    var child = spawn( cmd, args );
    var response = '';
    child.stdout.on('data', function( buffer ){ resp += buffer.toString(); });
    child.stdout.on('end', function(){ callback( resp ) });
}

});