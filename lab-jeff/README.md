## **README**

#### **Description**

This project creates an HTTP Server using the http module, and
creates a parse body module that is used for all POST requests.

For all requests to '/' the server should responds with:

A header containing Content-Type: text/plain.
A status code of 200.
A response with the string "hello world".


GET Requests:

Response headers include 'Content-Type: text/plain'.
When the query 'text=message' is set, the server responds with a status code of 200 and a body including the value returned from cowsay.say({text: <querystring text>}).

When the query 'text=message' is not set, the server responds with a status code of 400 and a body including the value returned from cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}).


POST Requests:

Response headers include 'Content-Type: text/plain'.
When the json '{text: message}' is set in the body, the server responds with a status code of 200 and a body including the value returned from cowsay.say({text: <querystring text>}).

When the json '{text: message}' is not set in the body, the server responds with a status code of 400 and a body including the value returned from cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}).
