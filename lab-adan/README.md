##cowsay HTTP Server

Responds with a 200 and the cow will tell you 'hello world'
/cowsay

##GET

Requires a querystring formatted as text=message
An incorrect format querystring will cause the server to respond 400 and have the cow give you a tip to fix your request
A correct format querystring will respond 200 and the cow will tell you your message

##POST

Requires a body consisting of JSON in the format {"text": "message"}
An incorrect format body will respond 400 and the cow will tell you the correct format
A correct format body will respond 200 and the cow will tell you your
