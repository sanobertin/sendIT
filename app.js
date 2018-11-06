const fs = require('fs');
const http = require('http');

console.log('OK');
function onRequest(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('/UI/index.html', null, (error, data) => {
    if (error) { response.writeHead(404); response.write('File not found'); } else { response.write(data); }
    response.end();
  });
  response.end();
}

http.createServer(onRequest).listen(8000);




