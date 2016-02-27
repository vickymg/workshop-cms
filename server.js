var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

var message = 'I am so happy to be part of the Node Girls workshop!';
var message1 = 'Node js is so much fun!';
var message2 = 'Node girls.';

function handler (request, response) {


  var endpoint = request.url;
  console.log(endpoint);

  var method = request.method;
  console.log(method);

  if (endpoint === '/node') {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message1);
    response.end();
  }
  else if (endpoint === '/girls') {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message2);
    response.end();
  }
  else if (endpoint === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/public/index.html', function(error, file) {
     if (error) {
       console.log(error);
       return;
      }
      response.end(file);
    });
  }
  else if (endpoint === '/create-post') {

    response.writeHead(302, {"Location": "/"});

    var allTheData = '';
    request.on('data', function (chunkOfData) {
      allTheData += chunkOfData;
    });

    request.on('end', function () {
      console.log(allTheData);
      response.end();
    });

    request.on('end', function () {

      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.end();
    });

  }
  else {
    var contentType = request.headers.accept.split(',')[0];
    response.writeHead(200, {"Content-Type": contentType});
    fs.readFile(__dirname + '/public' + endpoint, function(error, file) {
     if (error) {
       console.log(error);
       return;
     }
     response.end(file);

     });
  }
}


var server = http.createServer(handler);

server.listen(3000, function () {
  console.log("Server is listening on port 3000.  Ready to accept requests!");
});
