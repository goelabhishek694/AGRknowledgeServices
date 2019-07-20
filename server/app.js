const https = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = https.createServer((req, res) => {
  if(req.url === '/home' || req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/index.html').pipe(res);
    console.log('loaded html index');
  } else if(req.url === '/infra'){
    fs.createReadStream(__dirname + '/infrahtml.html').pipe(res);
  } else if(req.url === '/contact'){
    fs.createReadStream(__dirname + '/contact.html').pipe(res);
  } else if(req.url === '/dest'){
    fs.createReadStream(__dirname + '/destination.html').pipe(res);
  } else if(req.url === '/hotel'){
    fs.createReadStream(__dirname + '/hotel-resto.html').pipe(res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
