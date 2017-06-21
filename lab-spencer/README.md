# cowsay HTTP Server  

This is an HTTP server that listens for GET and POST requests to /cowsay and any request to /.  

## /  
### <any_request>  
- Responds with a 200 and the cow will tell you 'hello world'  

## /cowsay  

### GET  
- Requires a querystring formatted as ?text=message  
- An incorrectly formatted querystring will cause the server to respond 400 and have the cow give you a tip to fix your request  
- A correctly formatted querystring will respond 200 and the cow will tell you your message  

### POST  
- Requires a body consisting of JSON in the format {"text": "message"}  
- An incorrectly formatted body will respond 400 and the cow will tell you the correct format  
- A correctly formatted body will respond 200 and the cow will tell you your <message>  

### <any_other_request>
- Responds with a 400 with the cow telling you that request type is not accepted
