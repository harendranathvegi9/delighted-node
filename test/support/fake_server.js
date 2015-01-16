var http = require('http');

var mapping = {
  '/fake': {
    status: 200,
    body: { message: 'OK' }
  },

  '/fake?per_page=20&page=10': {
    status: 200,
    body: { message: 'ALRIGHT' }
  },

  '/201': {
    status: 201,
    body: { ok: true }
  },

  '/401':  {
    status: 401,
    body: null
  },

  '/metrics': {
    status: 200,
    body: { nps: 0 }
  },

  '/people': {
    status: 201,
    body: { email: 'foo@example.com' }
  },

  '/people/foo%40example.com/survey_requests/pending': {
    status: 200,
    body: { ok: true }
  },

  '/survey_responses': {
    status: 201,
    body: { person: '321' }
  },

  '/survey_responses/321': {
    status: 200,
    body: { person: '321' }
  },

  '/survey_responses?order=desc': {
    status: 200,
    body: [{ id: 1 }, { id: 2 }]
  },

  '/unsubscribes': {
    status: 201,
    body: { person_email: 'foo@example.com' }
  }
};

var handler = function(request, response) {
  var mapped = mapping[request.url];
  var body = JSON.stringify(mapped.body);

  response.writeHead(mapped.status);
  response.end(body);

  return response;
};

module.exports = function(port) {
  var server = http.createServer(handler);

  server.listen(port);

  return server;
}
