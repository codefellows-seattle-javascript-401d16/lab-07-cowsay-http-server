#Documentation

The server is started by calling node server.js in the terminal

#All responses come as 'Content-Type': 'text/plain'.

###Responding to '/'
The server responds to all successful requests at '/' with type 200 'hello world'.

Bad POST requests respond with type 400 'Your JSON is bad'.

Errors on the server side respond with type 500 'Internal Server Error'.

Bad URLs respond with type 404.

###Responding to /cowsay

GET and POST requests to /cowsay should be formatted like /cowsay?text=yourMessage for GET or {"text": "your message"} and respond with type 200 with a cow saying your text.

Bad GET and POST requests to /cowsay respond with type 400 and a cow saying 'bad request(newline)try: localhost:3000/cowsay?text=howdy' or 'bad request\ntry: localhost:3000/cowsay with body {text : \'howdy\'}'
