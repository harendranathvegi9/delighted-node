var http = require('http');

module.exports = function(port, mapping) {
  var handler = function(request, response) {
    var mapped = mapping[request.url];
    var body = JSON.stringify(mapped.body);

    response.writeHead(mapped.status);
    response.end(body);

    return response;
  };

  var server = http.createServer(handler);

  server.listen(port);

  return server;
}
